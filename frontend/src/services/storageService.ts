import { supabase } from '../config/supabase';

/**
 * Sube una imagen al storage de Supabase
 * @param file - Archivo de imagen a subir
 * @param bucket - Nombre del bucket (ej: 'avatars', 'covers', 'books')
 * @param userId - ID del usuario (para organizar archivos)
 * @returns URL pública de la imagen subida
 */
export const uploadImage = async (
  file: File,
  bucket: string,
  userId: string
): Promise<string> => {
  try {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen');
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('La imagen no debe superar los 5MB');
    }

    // Generar nombre único para el archivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    // Obtener URL pública
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  } catch (error: any) {
    console.error('Error al subir imagen:', error);
    throw new Error(error.message || 'Error al subir la imagen');
  }
};

/**
 * Elimina una imagen del storage de Supabase
 * @param bucket - Nombre del bucket
 * @param filePath - Ruta del archivo a eliminar
 */
export const deleteImage = async (
  bucket: string,
  filePath: string
): Promise<void> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error('Error al eliminar imagen:', error);
    throw new Error(error.message || 'Error al eliminar la imagen');
  }
};

/**
 * Sube foto de perfil
 */
export const uploadProfilePhoto = async (
  file: File,
  userId: string
): Promise<string> => {
  return uploadImage(file, 'avatars', userId);
};

/**
 * Sube foto de portada
 */
export const uploadCoverPhoto = async (
  file: File,
  userId: string
): Promise<string> => {
  return uploadImage(file, 'covers', userId);
};

/**
 * Sube foto de libro
 */
export const uploadBookPhoto = async (
  file: File,
  userId: string
): Promise<string> => {
  return uploadImage(file, 'books', userId);
};
