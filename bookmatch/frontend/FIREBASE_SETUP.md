# 🔥 Guía de Configuración de Firebase para BookMatch

Esta guía te ayudará a configurar Firebase Authentication para el sistema de registro e inicio de sesión de BookMatch.

## ✅ YA COMPLETADO

Los siguientes archivos ya han sido creados:
- ✅ `src/config/firebase.ts` - Configuración de Firebase
- ✅ `src/services/authService.ts` - Servicio de autenticación
- ✅ `src/context/AuthContext.tsx` - Contexto actualizado con Firebase
- ✅ `.env.example` - Plantilla de variables de entorno
- ✅ Firebase instalado (`npm install firebase`)

## 🚀 PASOS QUE DEBES COMPLETAR

### Paso 1: Crear Proyecto en Firebase

1. **Ir a Firebase Console**
   - Visita: https://console.firebase.google.com/
   - Inicia sesión con tu cuenta de Google

2. **Crear Nuevo Proyecto**
   - Click en "Agregar proyecto" o "Add project"
   - Nombre del proyecto: `BookMatch` (o el nombre que prefieras)
   - (Opcional) Desactiva Google Analytics si no lo necesitas
   - Click en "Crear proyecto"

### Paso 2: Registrar tu App Web

1. En el dashboard del proyecto, click en el ícono **Web** (`</>`)
2. Registra la app:
   - Nickname: `BookMatch Frontend`
   - No marques "Firebase Hosting" (por ahora)
   - Click en "Registrar app"

3. **Copiar la configuración**
   - Verás un objeto `firebaseConfig` con tus credenciales
   - **NO cierres esta ventana aún**, necesitarás estos datos

### Paso 3: Activar Authentication

1. En el menú lateral, ve a **Build > Authentication**
2. Click en "Get started" o "Comenzar"
3. En la pestaña **Sign-in method**, habilita:
   - ✅ **Email/Password** (Click en "Enable" y guarda)

### Paso 4: Activar Firestore Database

1. En el menú lateral, ve a **Build > Firestore Database**
2. Click en "Create database" o "Crear base de datos"
3. Selecciona "Start in test mode" (por ahora, lo aseguraremos después)
4. Elige la ubicación más cercana a tus usuarios (por ejemplo: `us-central`)
5. Click en "Enable"

### Paso 5: Crear archivo .env con tus credenciales

1. **Copia el archivo `.env.example` a `.env`:**

```bash
cd /Users/wendynieto/hackaton/bookmatch/frontend
cp .env.example .env
```

2. **Edita el archivo `.env` y reemplaza con las credenciales de Firebase Console:**

Abre `.env` y reemplaza cada valor con los datos que copiaste del paso 2:

```bash
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu-proyecto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**IMPORTANTE:** No compartas este archivo `.env` con nadie ni lo subas a Git (ya está en `.gitignore`)

### Paso 6: Configurar Reglas de Seguridad de Firestore

En Firebase Console, ve a **Firestore Database > Reglas**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Los usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Permite lectura pública de libros pero solo usuarios autenticados pueden escribir
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click en **"Publicar"** o **"Publish"** para guardar las reglas.

### Paso 7: Reiniciar el servidor de desarrollo

Una vez que hayas configurado el archivo `.env`:

```bash
# Detén el servidor si está corriendo (Ctrl+C)
# Luego reinícialo
npm start
```

## 📚 ARCHIVOS YA CREADOS (Referencia)

Los siguientes archivos ya fueron creados automáticamente. Solo necesitas configurar tu archivo `.env`:

### `src/config/firebase.ts`
Configuración de Firebase con variables de entorno.

### `src/services/authService.ts`
Funciones de autenticación:
- `registerUser(data)` - Registrar nuevo usuario
- `loginUser(email, password)` - Iniciar sesión
- `logoutUser()` - Cerrar sesión
- `getCurrentUser()` - Obtener usuario actual

### `src/context/AuthContext.tsx`
Contexto actualizado con Firebase. Ya integra:
- Estado de autenticación con Firebase
- Funciones de login, logout y registro
- Sincronización automática con Firebase Auth

## ✅ Probar la Integración

1. Asegúrate de haber configurado el archivo `.env`
2. Reinicia el servidor: `npm start`
3. Ve a `/register` en tu app y crea una cuenta
4. Verifica en Firebase Console > Authentication que se creó el usuario
5. Verifica en Firestore Database que se guardaron los datos del usuario
6. Prueba iniciar sesión con las credenciales

## 🚨 Solución de Problemas Comunes

### Error: "Firebase: Error (auth/email-already-in-use)"
- El email ya está registrado. Usa otro email o ve a Firebase Console para eliminar el usuario.

### Error: "Firebase: Password should be at least 6 characters"
- Firebase requiere contraseñas de al menos 6 caracteres.

### Error: "Module not found: Can't resolve 'firebase'"
- Asegúrate de haber ejecutado `npm install firebase`
- Reinicia el servidor de desarrollo

### La app no se actualiza después de cambios en `.env`
- Reinicia el servidor de desarrollo (`Ctrl+C` y `npm start` de nuevo)

## 📚 Recursos Adicionales

- [Documentación oficial de Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

---

## 🎯 Resumen Rápido

**Lo que ya está hecho:**
✅ Firebase instalado
✅ Archivos de configuración creados
✅ Servicios de autenticación listos
✅ Contexto integrado con Firebase
✅ `.env.example` creado

**Lo que TÚ debes hacer:**
1. Crear proyecto en Firebase Console
2. Activar Authentication (Email/Password)
3. Activar Firestore Database
4. Copiar credenciales de Firebase
5. Crear archivo `.env` con tus credenciales
6. Configurar reglas de Firestore
7. Reiniciar servidor y probar

¡Listo! Ahora tienes Firebase completamente configurado para BookMatch 🎉
