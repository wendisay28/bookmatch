# 📚 Ruedelo - Red Social de Intercambio de Libros

> Plataforma comunitaria para compartir, intercambiar y rastrear libros en una red de lectores apasionados.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Características Principales

### 📖 Gestión de Libros
- **Contribuir libros** a la biblioteca comunitaria con código TFT único
- **Subir múltiples imágenes** de tus libros (hasta 5)
- **Seguimiento de trazabilidad** completa de cada libro
- **Sistema de disponibilidad** para marcar cuándo puedes intercambiar

### 🔄 Sistema de Intercambios (TFT - Traveling Free Tales)
- **Solicitar libros** de otros usuarios
- **Aceptar/rechazar** solicitudes de intercambio
- **Historial completo** de todos los intercambios
- **Trazabilidad visual** con timeline de ciudades y lectores

### 🏆 Sistema de Gamificación
- **Insignias automáticas** desbloqueables por logros
- **5 niveles de rareza**: Común, Poco Común, Rara, Épica, Legendaria
- **Criterios variados**: libros vinculados, intercambios, eventos asistidos
- **Visualización de progreso** en el perfil

### 🔍 Exploración y Búsqueda
- **Biblioteca comunitaria** con todos los libros disponibles
- **Búsqueda en tiempo real** por título, autor o código TFT
- **Vista lista/cuadrícula** intercambiable
- **Filtros** por disponibilidad y ubicación

### 👥 Perfil de Usuario
- **Estadísticas detalladas**: libros vinculados, intercambios, eventos
- **Galería de insignias** con progreso
- **Historial de intercambios** completo
- **Gráficas de rendimiento**
- **Foto de perfil y portada** personalizables

### 📅 Eventos Comunitarios
- **Crear eventos** de intercambio
- **Subir imágenes** a eventos
- **Sistema de asistencia** y seguimiento
- **Eventos destacados** en el feed

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 16.x
- npm >= 8.x
- Cuenta de Firebase
- Cuenta de Supabase (para almacenamiento de imágenes)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/wendisay28/bookmatch.git
cd bookmatch/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase Configuration
REACT_APP_SUPABASE_URL=https://tu-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key
```

4. **Configurar Firebase**

Sigue las instrucciones en [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para:
- Crear proyecto en Firebase Console
- Habilitar Authentication (Email/Password)
- Crear base de datos Firestore
- Configurar Storage

5. **Configurar Supabase**

Sigue las instrucciones en [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) para:
- Crear proyecto en Supabase
- Crear bucket `book-images` (público)
- Obtener URL y Anon Key

6. **Iniciar servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── home/         # Componentes del home
│   │   ├── library/      # Componentes de biblioteca
│   │   └── profile/      # Componentes de perfil
│   ├── config/           # Configuración Firebase/Supabase
│   ├── context/          # React Context (Auth, Menu)
│   ├── data/             # Datos mock para desarrollo
│   ├── pages/            # Páginas de la aplicación
│   ├── services/         # Servicios backend
│   │   ├── authService.ts
│   │   ├── bookService.ts
│   │   ├── matchService.ts
│   │   ├── badgeService.ts
│   │   ├── bookTrackingService.ts
│   │   └── storageService.ts
│   ├── theme/            # Tema Material-UI
│   ├── types/            # Tipos TypeScript
│   ├── App.tsx           # Componente principal
│   └── index.tsx         # Punto de entrada
├── .env.example          # Plantilla de variables de entorno
├── FIREBASE_SETUP.md     # Guía de configuración Firebase
├── SUPABASE_SETUP.md     # Guía de configuración Supabase
└── package.json          # Dependencias y scripts
```

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo (puerto 3000) |
| `npm run build` | Crea build optimizado para producción |
| `npm test` | Ejecuta tests en modo watch |
| `npm run lint` | Ejecuta ESLint en código fuente |

---

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Material-UI v5** - Componentes UI
- **React Router v6** - Navegación
- **Emotion** - CSS-in-JS
- **Framer Motion** - Animaciones
- **Notistack** - Notificaciones

### Backend & Servicios
- **Firebase Auth** - Autenticación
- **Firestore** - Base de datos NoSQL
- **Firebase Storage** - Almacenamiento
- **Supabase Storage** - Almacenamiento de imágenes alternativo

### Desarrollo
- **CRACO** - Configuración de Create React App
- **ESLint** - Linting
- **Tailwind CSS** - Utilidades CSS

---

## 📊 Modelo de Datos

### Usuario (users)
```typescript
{
  id: string;
  name: string;
  email: string;
  username?: string;
  photoUrl?: string;
  coverUrl?: string;
  quote?: string;
  booksLinked: number;
  totalExchanges: number;
  eventsAttended: number;
  readerLevel: number;
  holdingBooks: string[];      // IDs de libros en posesión
  contributedBooks: string[];  // IDs de libros contribuidos
  badges: string[];            // IDs de insignias
  createdAt: Timestamp;
}
```

### Libro (books)
```typescript
{
  id: string;
  code: string;              // TFT-XXXXX
  title: string;
  author: string;
  isbn?: string;
  coverUrl: string;
  images: string[];          // URLs de imágenes adicionales
  contributedBy: string;     // ID del usuario que lo contribuyó
  currentHolder: string;     // ID del usuario actual
  isAvailable: boolean;
  availableDate: Timestamp | null;
  totalExchanges: number;
  cities: string[];          // Ciudades por las que ha pasado
  avgReadingTime: number;    // Días promedio de lectura
  receivedDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Solicitud de Intercambio (exchangeRequests)
```typescript
{
  id: string;
  bookId: string;
  fromUserId: string;        // Quien solicita
  toUserId: string;          // Quien tiene el libro
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
  respondedAt?: Timestamp;
}
```

### Historial de Intercambios (bookHistory)
```typescript
{
  id: string;
  bookId: string;
  fromUserId: string;
  toUserId: string;
  city: string;
  daysHeld: number;
  transferDate: Timestamp;
}
```

---

## 🎯 Roadmap

### ✅ Fase 1 - MVP (Completado)
- [x] Sistema de autenticación
- [x] Gestión de libros
- [x] Sistema de intercambios
- [x] Sistema de insignias
- [x] Perfiles de usuario
- [x] Biblioteca comunitaria
- [x] Eventos comunitarios

### 🚧 Fase 2 - Mejoras (En progreso)
- [ ] Validación de formularios
- [ ] Manejo de errores robusto
- [ ] Tests unitarios
- [ ] Optimización de performance
- [ ] Sistema de notificaciones en tiempo real

### 📋 Fase 3 - Funcionalidades Avanzadas
- [ ] Sistema de chat/mensajería
- [ ] Mapa de libros disponibles
- [ ] Integración con APIs de libros (Google Books, Open Library)
- [ ] Sistema de reseñas y ratings
- [ ] PWA (Progressive Web App)
- [ ] Estadísticas avanzadas con gráficas

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un [issue](https://github.com/wendisay28/bookmatch/issues) con:
- Descripción detallada del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si es posible
- Información del navegador/sistema

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Autores

- **Wendy Nieto** - [@wendisay28](https://github.com/wendisay28)

---

## 🙏 Agradecimientos

- Comunidad de lectores TFT (Traveling Free Tales)
- Material-UI por los increíbles componentes
- Firebase por la infraestructura backend
- Supabase por el almacenamiento de imágenes

---

## 📞 Contacto

Para preguntas o sugerencias:
- Email: tu-email@example.com
- GitHub: [@wendisay28](https://github.com/wendisay28)

---

**¡Feliz lectura y compartir! 📚✨**
