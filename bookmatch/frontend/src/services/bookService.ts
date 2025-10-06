import { doc, getDoc, updateDoc, increment, arrayUnion, addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { checkAndAwardBadges } from './badgeService';
import { supabase } from '../config/supabase';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  coverUrl?: string;
  linkedAt: string;
}

/**
 * Genera un código TFT único para el libro
 */
const generateTFTCode = (): string => {
  const prefix = 'TFT';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const suffix = chars.charAt(Math.floor(Math.random() * chars.length));
  return `${prefix}-${code}${suffix}`;
};

/**
 * Sube imágenes del libro a Supabase Storage
 */
const uploadBookImages = async (bookCode: string, images: File[]): Promise<string[]> => {
  const imageUrls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const fileExt = file.name.split('.').pop();
    const fileName = `${bookCode}_${i}_${Date.now()}.${fileExt}`;
    const filePath = `books/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('book-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('book-images')
        .getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }

  return imageUrls;
};

/**
 * Contribuye/dona un libro al sistema TFT
 * Crea el libro en Firestore y lo asigna al usuario como lector inicial
 */
export const contributeBook = async (
  userId: string,
  bookData: {
    title: string;
    author: string;
    isbn?: string;
    coverUrl?: string;
    city: string;
    images?: File[];
  }
): Promise<string> => {
  try {
    const tftCode = generateTFTCode();
    const now = Timestamp.now();

    // Subir imágenes si existen
    let imageUrls: string[] = [];
    if (bookData.images && bookData.images.length > 0) {
      imageUrls = await uploadBookImages(tftCode, bookData.images);
    }

    // Usar la primera imagen como portada si no se proporcionó coverUrl
    const coverUrl = bookData.coverUrl ||
                     (imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/400x600/14B8A6/ffffff?text=LIBRO');

    // Crear el libro en la colección books
    const bookRef = await addDoc(collection(db, 'books'), {
      code: tftCode,
      title: bookData.title,
      author: bookData.author,
      isbn: bookData.isbn || '',
      coverUrl,
      images: imageUrls,
      contributedBy: userId,
      currentHolder: userId,
      isAvailable: false,
      availableDate: null,
      totalExchanges: 0,
      cities: [bookData.city],
      avgReadingTime: 0,
      receivedDate: now,
      createdAt: now,
      updatedAt: now
    });

    // Actualizar usuario: incrementar booksLinked y agregar a holdingBooks y contributedBooks
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      booksLinked: increment(1),
      holdingBooks: arrayUnion(bookRef.id),
      contributedBooks: arrayUnion(bookRef.id)
    });

    // Obtener estadísticas actualizadas del usuario
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userStats = {
        booksLinked: userData.booksLinked || 0,
        totalExchanges: userData.totalExchanges || 0,
        eventsAttended: userData.eventsAttended || 0
      };

      // Verificar y otorgar insignias automáticamente
      const newBadges = await checkAndAwardBadges(userId, userStats);

      if (newBadges && newBadges.length > 0) {
        console.log('¡Nuevas insignias desbloqueadas al vincular libro!', newBadges.map(b => b.name));
      }
    }

    return tftCode;
  } catch (error) {
    console.error('Error al contribuir libro:', error);
    throw error;
  }
};

/**
 * Vincula un nuevo libro a la biblioteca del usuario y verifica automáticamente
 * si debe otorgar nuevas insignias basadas en el número de libros vinculados.
 * @deprecated Usar contributeBook() en su lugar
 */
export const linkBookToUser = async (userId: string, book: Omit<Book, 'linkedAt'>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);

    // Agregar fecha de vinculación
    const bookWithTimestamp: Book = {
      ...book,
      linkedAt: new Date().toISOString()
    };

    // Actualizar documento del usuario: incrementar contador y agregar libro
    await updateDoc(userRef, {
      booksLinked: increment(1),
      books: arrayUnion(bookWithTimestamp)
    });

    // Obtener estadísticas actualizadas del usuario
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userStats = {
        booksLinked: userData.booksLinked || 0,
        totalExchanges: userData.totalExchanges || 0,
        eventsAttended: userData.eventsAttended || 0
      };

      // Verificar y otorgar insignias automáticamente
      const newBadges = await checkAndAwardBadges(userId, userStats);

      if (newBadges && newBadges.length > 0) {
        console.log('¡Nuevas insignias desbloqueadas!', newBadges.map(b => b.name));
        // Aquí podrías emitir un evento o mostrar una notificación al usuario
        return;
      }
    }
  } catch (error) {
    console.error('Error al vincular libro:', error);
    throw error;
  }
};

/**
 * Registra un intercambio completado y verifica automáticamente
 * si debe otorgar nuevas insignias basadas en el número de intercambios.
 */
export const recordExchange = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);

    // Incrementar contador de intercambios
    await updateDoc(userRef, {
      totalExchanges: increment(1)
    });

    // Obtener estadísticas actualizadas del usuario
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userStats = {
        booksLinked: userData.booksLinked || 0,
        totalExchanges: userData.totalExchanges || 0,
        eventsAttended: userData.eventsAttended || 0
      };

      // Verificar y otorgar insignias automáticamente
      const newBadges = await checkAndAwardBadges(userId, userStats);

      if (newBadges && newBadges.length > 0) {
        console.log('¡Nuevas insignias desbloqueadas!', newBadges.map(b => b.name));
      }
    }
  } catch (error) {
    console.error('Error al registrar intercambio:', error);
    throw error;
  }
};

/**
 * Registra asistencia a un evento y verifica automáticamente
 * si debe otorgar nuevas insignias basadas en eventos asistidos.
 */
export const recordEventAttendance = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);

    // Incrementar contador de eventos
    await updateDoc(userRef, {
      eventsAttended: increment(1)
    });

    // Obtener estadísticas actualizadas del usuario
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userStats = {
        booksLinked: userData.booksLinked || 0,
        totalExchanges: userData.totalExchanges || 0,
        eventsAttended: userData.eventsAttended || 0
      };

      // Verificar y otorgar insignias automáticamente
      const newBadges = await checkAndAwardBadges(userId, userStats);

      if (newBadges && newBadges.length > 0) {
        console.log('¡Nuevas insignias desbloqueadas!', newBadges.map(b => b.name));
      }
    }
  } catch (error) {
    console.error('Error al registrar asistencia a evento:', error);
    throw error;
  }
};
