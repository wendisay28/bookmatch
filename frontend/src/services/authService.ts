import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Registrar nuevo usuario
export const registerUser = async (data: RegisterData): Promise<User> => {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    // Actualizar perfil con el nombre
    await updateProfile(user, {
      displayName: data.name
    });

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
      readerLevel: 1,
      booksLinked: 0,
      totalExchanges: 0,
      eventsAttended: 0
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Error al registrar usuario');
  }
};

// Iniciar sesión
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Error al cerrar sesión');
  }
};

// Obtener usuario actual
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
