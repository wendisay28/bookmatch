import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============= INTERFACES =============

export interface BookHistory {
  id: string;
  bookCode: string;
  fromUser: string;
  fromUserName: string;
  toUser: string;
  toUserName: string;
  transferDate: string;
  city: string;
  daysHeld: number;
}

export interface BookStats {
  totalExchanges: number;
  totalReaders: number;
  citiesVisited: string[];
  avgReadingTime: number;
  totalDaysInCirculation: number;
  currentReader: string;
  currentReaderName: string;
  contributedBy: string;
  contributedByName: string;
}

export interface BookJourney {
  code: string;
  title: string;
  author: string;
  coverUrl: string;
  history: BookHistory[];
  stats: BookStats;
}

// ============= FUNCIONES =============

/**
 * Obtiene el historial completo de un libro por su código TFT
 * NOTA: La trazabilidad blockchain con Polkadot se implementará después
 */
export const getBookHistory = async (bookCode: string): Promise<BookHistory[]> => {
  try {
    const historyQuery = query(
      collection(db, 'bookHistory'),
      where('bookCode', '==', bookCode),
      orderBy('transferDate', 'asc')
    );

    const snapshot = await getDocs(historyQuery);
    const history: BookHistory[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // Obtener nombres de usuarios
      const fromUserDoc = await getDoc(doc(db, 'users', data.fromUser));
      const toUserDoc = await getDoc(doc(db, 'users', data.toUser));

      const fromUserName = fromUserDoc.exists() ? fromUserDoc.data().name : 'Usuario desconocido';
      const toUserName = toUserDoc.exists() ? toUserDoc.data().name : 'Usuario desconocido';

      history.push({
        id: docSnap.id,
        bookCode: data.bookCode,
        fromUser: data.fromUser,
        fromUserName,
        toUser: data.toUser,
        toUserName,
        transferDate: data.transferDate?.toDate?.().toISOString() || new Date().toISOString(),
        city: data.city || 'Ciudad desconocida',
        daysHeld: data.daysHeld || 0
      });
    }

    return history;
  } catch (error) {
    console.error('Error al obtener historial del libro:', error);
    return [];
  }
};

/**
 * Calcula estadísticas detalladas de un libro
 */
export const calculateBookStats = async (bookId: string): Promise<BookStats | null> => {
  try {
    // Obtener información del libro
    const bookDoc = await getDoc(doc(db, 'books', bookId));
    if (!bookDoc.exists()) {
      return null;
    }

    const bookData = bookDoc.data();

    // Obtener historial
    const history = await getBookHistory(bookData.code);

    // Calcular estadísticas
    const uniqueReaders = new Set([
      bookData.contributedBy,
      ...history.map(h => h.fromUser),
      ...history.map(h => h.toUser)
    ]);

    const totalDaysInCirculation = history.reduce((sum, h) => sum + h.daysHeld, 0);

    // Obtener nombres
    const currentReaderDoc = await getDoc(doc(db, 'users', bookData.currentHolder));
    const contributedByDoc = await getDoc(doc(db, 'users', bookData.contributedBy));

    const stats: BookStats = {
      totalExchanges: bookData.totalExchanges || history.length,
      totalReaders: uniqueReaders.size,
      citiesVisited: bookData.cities || [],
      avgReadingTime: bookData.avgReadingTime || 0,
      totalDaysInCirculation,
      currentReader: bookData.currentHolder,
      currentReaderName: currentReaderDoc.exists() ? currentReaderDoc.data().name : 'Usuario',
      contributedBy: bookData.contributedBy,
      contributedByName: contributedByDoc.exists() ? contributedByDoc.data().name : 'Usuario'
    };

    return stats;
  } catch (error) {
    console.error('Error al calcular estadísticas del libro:', error);
    return null;
  }
};

/**
 * Obtiene el viaje completo de un libro (historial + estadísticas)
 */
export const getBookJourney = async (bookCode: string): Promise<BookJourney | null> => {
  try {
    // Buscar el libro por código
    const booksQuery = query(
      collection(db, 'books'),
      where('code', '==', bookCode)
    );

    const booksSnapshot = await getDocs(booksQuery);
    if (booksSnapshot.empty) {
      return null;
    }

    const bookDoc = booksSnapshot.docs[0];
    const bookData = bookDoc.data();

    // Obtener historial y estadísticas
    const history = await getBookHistory(bookCode);
    const stats = await calculateBookStats(bookDoc.id);

    if (!stats) {
      return null;
    }

    const journey: BookJourney = {
      code: bookData.code,
      title: bookData.title,
      author: bookData.author,
      coverUrl: bookData.coverUrl || 'https://placehold.co/400x600/14B8A6/ffffff?text=LIBRO',
      history,
      stats
    };

    return journey;
  } catch (error) {
    console.error('Error al obtener viaje del libro:', error);
    return null;
  }
};

/**
 * Obtiene libros recientes en el sistema (para feed o descubrimiento)
 */
export const getRecentBooks = async (limit: number = 10): Promise<any[]> => {
  try {
    const booksQuery = query(
      collection(db, 'books'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(booksQuery);
    const books = snapshot.docs.slice(0, limit).map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        code: data.code,
        title: data.title,
        author: data.author,
        coverUrl: data.coverUrl || 'https://placehold.co/100x150/14B8A6/ffffff?text=LIBRO',
        totalExchanges: data.totalExchanges || 0,
        cities: data.cities || [],
        isAvailable: data.isAvailable || false
      };
    });

    return books;
  } catch (error) {
    console.error('Error al obtener libros recientes:', error);
    return [];
  }
};

/**
 * Obtiene los libros más viajeros (más intercambios)
 */
export const getMostTraveledBooks = async (limit: number = 10): Promise<any[]> => {
  try {
    const booksQuery = query(
      collection(db, 'books'),
      orderBy('totalExchanges', 'desc')
    );

    const snapshot = await getDocs(booksQuery);
    const books = snapshot.docs.slice(0, limit).map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        code: data.code,
        title: data.title,
        author: data.author,
        coverUrl: data.coverUrl || 'https://placehold.co/100x150/14B8A6/ffffff?text=LIBRO',
        totalExchanges: data.totalExchanges || 0,
        cities: data.cities || [],
        avgReadingTime: data.avgReadingTime || 0
      };
    });

    return books;
  } catch (error) {
    console.error('Error al obtener libros más viajeros:', error);
    return [];
  }
};

/**
 * Verifica el estado actual de un libro
 */
export const getBookStatus = async (bookCode: string): Promise<{
  isAvailable: boolean;
  currentHolder: string;
  currentHolderName: string;
  daysWithCurrentReader: number;
} | null> => {
  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('code', '==', bookCode)
    );

    const snapshot = await getDocs(booksQuery);
    if (snapshot.empty) return null;

    const bookData = snapshot.docs[0].data();

    // Obtener nombre del lector actual
    const holderDoc = await getDoc(doc(db, 'users', bookData.currentHolder));
    const holderName = holderDoc.exists() ? holderDoc.data().name : 'Usuario';

    // Calcular días con el lector actual
    const receivedDate = bookData.receivedDate?.toDate() || new Date();
    const today = new Date();
    const daysWithCurrentReader = Math.floor((today.getTime() - receivedDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      isAvailable: bookData.isAvailable || false,
      currentHolder: bookData.currentHolder,
      currentHolderName: holderName,
      daysWithCurrentReader
    };
  } catch (error) {
    console.error('Error al obtener estado del libro:', error);
    return null;
  }
};
