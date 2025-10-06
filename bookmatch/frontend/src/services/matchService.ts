import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  Timestamp,
  arrayUnion,
  arrayRemove,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { recordExchange } from './bookService';

// ============= INTERFACES =============

export interface Book {
  id: string;
  code: string;
  title: string;
  author: string;
  isbn?: string;
  coverUrl: string;
  contributedBy: string;
  currentHolder: string;
  isAvailable: boolean;
  availableDate: string | null;
  totalExchanges: number;
  cities: string[];
  avgReadingTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface HoldingBook extends Book {
  receivedDate: string;
  daysHeld: number;
}

export interface ExchangeRequest {
  id: string;
  bookId: string;
  bookCode: string;
  bookTitle: string;
  fromUser: string;
  fromUserName: string;
  toUser: string;
  toUserName: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestDate: string;
  responseDate?: string;
  message?: string;
}

export interface BookTransfer {
  id: string;
  bookCode: string;
  fromUser: string;
  toUser: string;
  transferDate: string;
  city: string;
  daysHeld: number;
}

// ============= FUNCIONES DE LIBROS =============

/**
 * Obtiene los libros que el usuario tiene en su poder actualmente
 */
export const getMyHoldingBooks = async (userId: string): Promise<HoldingBook[]> => {
  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('currentHolder', '==', userId)
    );

    const snapshot = await getDocs(booksQuery);
    const books: HoldingBook[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const book: HoldingBook = {
        id: docSnap.id,
        code: data.code,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        coverUrl: data.coverUrl || 'https://placehold.co/100x150/14B8A6/ffffff?text=LIBRO',
        contributedBy: data.contributedBy,
        currentHolder: data.currentHolder,
        isAvailable: data.isAvailable || false,
        availableDate: data.availableDate || null,
        totalExchanges: data.totalExchanges || 0,
        cities: data.cities || [],
        avgReadingTime: data.avgReadingTime || 0,
        createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || new Date().toISOString(),
        receivedDate: data.receivedDate?.toDate?.().toISOString() || new Date().toISOString(),
        daysHeld: 0
      };

      // Calcular días que lo tiene
      const receivedDate = new Date(book.receivedDate);
      const today = new Date();
      book.daysHeld = Math.floor((today.getTime() - receivedDate.getTime()) / (1000 * 60 * 60 * 24));

      books.push(book);
    }

    return books;
  } catch (error) {
    console.error('Error al obtener libros en poder:', error);
    return [];
  }
};

/**
 * Obtiene los libros que el usuario ha aportado al club
 */
export const getMyContributedBooks = async (userId: string): Promise<Book[]> => {
  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('contributedBy', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(booksQuery);
    const books: Book[] = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        code: data.code,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        coverUrl: data.coverUrl || 'https://placehold.co/100x150/5B21B6/ffffff?text=LIBRO',
        contributedBy: data.contributedBy,
        currentHolder: data.currentHolder,
        isAvailable: data.isAvailable || false,
        availableDate: data.availableDate || null,
        totalExchanges: data.totalExchanges || 0,
        cities: data.cities || [],
        avgReadingTime: data.avgReadingTime || 0,
        createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || new Date().toISOString()
      };
    });

    return books;
  } catch (error) {
    console.error('Error al obtener libros aportados:', error);
    return [];
  }
};

/**
 * Configura la disponibilidad de un libro
 */
export const setBookAvailability = async (
  bookId: string,
  isAvailable: boolean,
  availableDate: string | null
): Promise<void> => {
  try {
    const bookRef = doc(db, 'books', bookId);
    await updateDoc(bookRef, {
      isAvailable,
      availableDate,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error al configurar disponibilidad:', error);
    throw error;
  }
};

/**
 * Busca libros disponibles para intercambio
 */
export const searchAvailableBooks = async (searchTerm?: string): Promise<Book[]> => {
  try {
    let booksQuery;

    if (searchTerm) {
      // Búsqueda simple por título (Firestore no soporta búsqueda full-text nativa)
      booksQuery = query(
        collection(db, 'books'),
        where('isAvailable', '==', true),
        orderBy('title')
      );
    } else {
      booksQuery = query(
        collection(db, 'books'),
        where('isAvailable', '==', true),
        orderBy('updatedAt', 'desc')
      );
    }

    const snapshot = await getDocs(booksQuery);
    let books: Book[] = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        code: data.code,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        coverUrl: data.coverUrl || 'https://placehold.co/100x150/14B8A6/ffffff?text=LIBRO',
        contributedBy: data.contributedBy,
        currentHolder: data.currentHolder,
        isAvailable: data.isAvailable,
        availableDate: data.availableDate,
        totalExchanges: data.totalExchanges || 0,
        cities: data.cities || [],
        avgReadingTime: data.avgReadingTime || 0,
        createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || new Date().toISOString()
      };
    });

    // Filtrar por término de búsqueda si existe
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.code.toLowerCase().includes(term)
      );
    }

    return books;
  } catch (error) {
    console.error('Error al buscar libros disponibles:', error);
    return [];
  }
};

// ============= FUNCIONES DE SOLICITUDES =============

/**
 * Obtiene las solicitudes de intercambio recibidas por el usuario
 */
export const getReceivedRequests = async (userId: string): Promise<ExchangeRequest[]> => {
  try {
    const requestsQuery = query(
      collection(db, 'exchangeRequests'),
      where('toUser', '==', userId),
      where('status', '==', 'pending'),
      orderBy('requestDate', 'desc')
    );

    const snapshot = await getDocs(requestsQuery);
    const requests: ExchangeRequest[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // Obtener nombre del solicitante
      const fromUserDoc = await getDoc(doc(db, 'users', data.fromUser));
      const fromUserName = fromUserDoc.exists() ? fromUserDoc.data().name : 'Usuario';

      requests.push({
        id: docSnap.id,
        bookId: data.bookId,
        bookCode: data.bookCode,
        bookTitle: data.bookTitle,
        fromUser: data.fromUser,
        fromUserName,
        toUser: data.toUser,
        toUserName: '',
        status: data.status,
        requestDate: data.requestDate?.toDate?.().toISOString() || new Date().toISOString(),
        message: data.message
      });
    }

    return requests;
  } catch (error) {
    console.error('Error al obtener solicitudes recibidas:', error);
    return [];
  }
};

/**
 * Obtiene las solicitudes de intercambio enviadas por el usuario
 */
export const getSentRequests = async (userId: string): Promise<ExchangeRequest[]> => {
  try {
    const requestsQuery = query(
      collection(db, 'exchangeRequests'),
      where('fromUser', '==', userId),
      orderBy('requestDate', 'desc')
    );

    const snapshot = await getDocs(requestsQuery);
    const requests: ExchangeRequest[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // Obtener nombre del receptor
      const toUserDoc = await getDoc(doc(db, 'users', data.toUser));
      const toUserName = toUserDoc.exists() ? toUserDoc.data().name : 'Usuario';

      requests.push({
        id: docSnap.id,
        bookId: data.bookId,
        bookCode: data.bookCode,
        bookTitle: data.bookTitle,
        fromUser: data.fromUser,
        fromUserName: '',
        toUser: data.toUser,
        toUserName,
        status: data.status,
        requestDate: data.requestDate?.toDate?.().toISOString() || new Date().toISOString(),
        responseDate: data.responseDate?.toDate?.().toISOString(),
        message: data.message
      });
    }

    return requests;
  } catch (error) {
    console.error('Error al obtener solicitudes enviadas:', error);
    return [];
  }
};

/**
 * Envía una solicitud de intercambio
 */
export const sendExchangeRequest = async (
  bookId: string,
  fromUserId: string,
  message?: string
): Promise<string> => {
  try {
    // Obtener información del libro
    const bookDoc = await getDoc(doc(db, 'books', bookId));
    if (!bookDoc.exists()) {
      throw new Error('Libro no encontrado');
    }

    const bookData = bookDoc.data();

    // Verificar que el libro esté disponible
    if (!bookData.isAvailable) {
      throw new Error('El libro no está disponible para intercambio');
    }

    // Verificar que no sea el mismo usuario
    if (bookData.currentHolder === fromUserId) {
      throw new Error('No puedes solicitar tu propio libro');
    }

    // Verificar si ya existe una solicitud pendiente
    const existingQuery = query(
      collection(db, 'exchangeRequests'),
      where('bookId', '==', bookId),
      where('fromUser', '==', fromUserId),
      where('status', '==', 'pending')
    );

    const existingSnapshot = await getDocs(existingQuery);
    if (!existingSnapshot.empty) {
      throw new Error('Ya tienes una solicitud pendiente para este libro');
    }

    // Crear la solicitud
    const requestData = {
      bookId,
      bookCode: bookData.code,
      bookTitle: bookData.title,
      fromUser: fromUserId,
      toUser: bookData.currentHolder,
      status: 'pending',
      requestDate: Timestamp.now(),
      message: message || ''
    };

    const docRef = await addDoc(collection(db, 'exchangeRequests'), requestData);

    return docRef.id;
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    throw error;
  }
};

/**
 * Acepta una solicitud de intercambio
 */
export const acceptRequest = async (requestId: string, city: string): Promise<void> => {
  try {
    const requestRef = doc(db, 'exchangeRequests', requestId);
    const requestDoc = await getDoc(requestRef);

    if (!requestDoc.exists()) {
      throw new Error('Solicitud no encontrada');
    }

    const requestData = requestDoc.data();
    const bookId = requestData.bookId;

    // Obtener información del libro y calcular días que lo tuvo
    const bookDoc = await getDoc(doc(db, 'books', bookId));
    if (!bookDoc.exists()) {
      throw new Error('Libro no encontrado');
    }

    const bookData = bookDoc.data();
    const receivedDate = bookData.receivedDate?.toDate() || new Date();
    const today = new Date();
    const daysHeld = Math.floor((today.getTime() - receivedDate.getTime()) / (1000 * 60 * 60 * 24));

    // Registrar transferencia en historial
    await addDoc(collection(db, 'bookHistory'), {
      bookCode: bookData.code,
      fromUser: requestData.toUser,
      toUser: requestData.fromUser,
      transferDate: Timestamp.now(),
      city,
      daysHeld
    });

    // Actualizar estadísticas del libro
    const newAvgReadingTime = bookData.totalExchanges > 0
      ? Math.round((bookData.avgReadingTime * bookData.totalExchanges + daysHeld) / (bookData.totalExchanges + 1))
      : daysHeld;

    const citiesSet = new Set(bookData.cities);
    citiesSet.add(city);
    const newCities = Array.from(citiesSet);

    // Transferir el libro al nuevo usuario
    const bookRef = doc(db, 'books', bookId);
    await updateDoc(bookRef, {
      currentHolder: requestData.fromUser,
      receivedDate: Timestamp.now(),
      isAvailable: false,
      availableDate: null,
      totalExchanges: increment(1),
      cities: newCities,
      avgReadingTime: newAvgReadingTime,
      updatedAt: Timestamp.now()
    });

    // Actualizar usuario anterior (quitar de holdingBooks)
    const fromUserRef = doc(db, 'users', requestData.toUser);
    await updateDoc(fromUserRef, {
      holdingBooks: arrayRemove(bookId)
    });

    // Actualizar nuevo usuario (agregar a holdingBooks)
    const toUserRef = doc(db, 'users', requestData.fromUser);
    await updateDoc(toUserRef, {
      holdingBooks: arrayUnion(bookId)
    });

    // Registrar intercambio para ambos usuarios (para insignias)
    await recordExchange(requestData.toUser);
    await recordExchange(requestData.fromUser);

    // Actualizar la solicitud
    await updateDoc(requestRef, {
      status: 'accepted',
      responseDate: Timestamp.now()
    });

  } catch (error) {
    console.error('Error al aceptar solicitud:', error);
    throw error;
  }
};

/**
 * Rechaza una solicitud de intercambio
 */
export const rejectRequest = async (requestId: string): Promise<void> => {
  try {
    const requestRef = doc(db, 'exchangeRequests', requestId);
    await updateDoc(requestRef, {
      status: 'rejected',
      responseDate: Timestamp.now()
    });
  } catch (error) {
    console.error('Error al rechazar solicitud:', error);
    throw error;
  }
};

/**
 * Obtiene información del usuario actual del libro
 */
export const getCurrentBookHolder = async (bookId: string): Promise<{ id: string; name: string } | null> => {
  try {
    const bookDoc = await getDoc(doc(db, 'books', bookId));
    if (!bookDoc.exists()) return null;

    const bookData = bookDoc.data();
    const userDoc = await getDoc(doc(db, 'users', bookData.currentHolder));

    if (!userDoc.exists()) return null;

    return {
      id: bookData.currentHolder,
      name: userDoc.data().name || 'Usuario'
    };
  } catch (error) {
    console.error('Error al obtener usuario actual del libro:', error);
    return null;
  }
};
