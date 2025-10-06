/**
 * Utilidades de validación para formularios
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Valida un email
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'El correo electrónico es requerido' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Ingresa un correo electrónico válido' };
  }

  return { isValid: true };
};

/**
 * Valida una contraseña
 */
export const validatePassword = (password: string, minLength: number = 6): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'La contraseña es requerida' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: `La contraseña debe tener al menos ${minLength} caracteres` };
  }

  return { isValid: true };
};

/**
 * Valida que dos contraseñas coincidan
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Las contraseñas no coinciden' };
  }

  return { isValid: true };
};

/**
 * Valida un nombre (no vacío y longitud mínima)
 */
export const validateName = (name: string, minLength: number = 2): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'El nombre es requerido' };
  }

  if (name.trim().length < minLength) {
    return { isValid: false, error: `El nombre debe tener al menos ${minLength} caracteres` };
  }

  return { isValid: true };
};

/**
 * Valida un campo requerido
 */
export const validateRequired = (value: string, fieldName: string = 'Este campo'): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }

  return { isValid: true };
};

/**
 * Valida un ISBN (10 o 13 dígitos)
 */
export const validateISBN = (isbn: string): ValidationResult => {
  if (!isbn) {
    return { isValid: true }; // ISBN es opcional
  }

  const cleanISBN = isbn.replace(/[-\s]/g, '');
  if (cleanISBN.length !== 10 && cleanISBN.length !== 13) {
    return { isValid: false, error: 'El ISBN debe tener 10 o 13 dígitos' };
  }

  if (!/^\d+$/.test(cleanISBN)) {
    return { isValid: false, error: 'El ISBN solo debe contener números' };
  }

  return { isValid: true };
};

/**
 * Valida una URL
 */
export const validateURL = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: true }; // URL es opcional
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Ingresa una URL válida' };
  }
};

/**
 * Valida una fecha (debe ser futura)
 */
export const validateFutureDate = (dateString: string): ValidationResult => {
  if (!dateString) {
    return { isValid: false, error: 'La fecha es requerida' };
  }

  const date = new Date(dateString);
  const now = new Date();

  if (date <= now) {
    return { isValid: false, error: 'La fecha debe ser futura' };
  }

  return { isValid: true };
};
