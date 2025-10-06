# 🏛️ Arquitectura - BookMatch

## Visión General

BookMatch utiliza una arquitectura **cliente-servidor** con servicios externos para autenticación, base de datos y almacenamiento. El sistema está diseñado para ser escalable, mantenible y seguro.

---

## Diagrama de Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                     │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │   React    │  │  TypeScript  │  │  Material-UI +       │ │
│  │   Router   │  │   Context    │  │  TailwindCSS         │ │
│  └────────────┘  └──────────────┘  └──────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │   API Gateway   │
                    │  (CORS, Auth)   │
                    └─────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                       SERVIDOR (Backend)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Express    │  │  Middleware  │  │    Validation    │   │
│  │   Routes     │  │  (Auth, Log) │  │   (Joi/Yup)      │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Controllers  │  │   Services   │  │     Utils        │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└──────────────────────────────────────────────────────────────┘
            ↓                    ↓                    ↓
┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐
│    Firebase     │  │    Supabase     │  │   External APIs  │
│  - Auth         │  │  - Storage      │  │  - Ethereum      │
│  - Firestore    │  │  - (Images)     │  │  - IPFS          │
└─────────────────┘  └─────────────────┘  └──────────────────┘
```

---

## Capas de la Aplicación

### 1. Presentación (Frontend)

#### Componentes
```
src/
├── pages/              # Rutas principales
├── components/         # Componentes reutilizables
│   ├── home/
│   ├── library/
│   └── profile/
├── context/           # Estado global
└── theme/             # Estilos
```

**Responsabilidades:**
- Renderizado de UI
- Gestión de estado local (useState, useReducer)
- Navegación (React Router)
- Validación de formularios
- Llamadas a servicios

#### State Management

```typescript
// Context API
AuthContext        → Autenticación global
MenuContext        → Estado del menú/navegación
NotificationContext → Notificaciones (futuro)

// Local State
useState           → Estado de componente
useReducer         → Estado complejo
```

---

### 2. Servicios (Business Logic)

```
src/services/
├── authService.ts        # Autenticación
├── bookService.ts        # Gestión de libros
├── badgeService.ts       # Sistema de insignias
├── matchService.ts       # Algoritmo de matching
├── storageService.ts     # Almacenamiento
└── bookTrackingService.ts # Tracking de lecturas
```

**Patrón:** Service Layer Pattern

```typescript
// Ejemplo: bookService.ts
export const contributeBook = async (
  userId: string,
  bookData: BookData
): Promise<string> => {
  // 1. Validar datos
  // 2. Generar código TFT
  // 3. Subir imágenes
  // 4. Crear documento en Firestore
  // 5. Actualizar stats del usuario
  // 6. Verificar badges
  // 7. Retornar resultado
};
```

---

### 3. Backend (API Server)

#### Estructura Propuesta

```
backend/
├── config/
│   ├── firebase.js
│   ├── supabase.js
│   └── env.js
├── middleware/
│   ├── auth.js          # Verificación JWT
│   ├── validate.js      # Validación de datos
│   ├── errorHandler.js  # Manejo de errores
│   └── rateLimiter.js   # Rate limiting
├── routes/
│   ├── auth.routes.js
│   ├── book.routes.js
│   ├── user.routes.js
│   └── event.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── book.controller.js
│   └── user.controller.js
├── services/
│   ├── auth.service.js
│   ├── book.service.js
│   └── badge.service.js
├── utils/
│   ├── logger.js
│   ├── validators.js
│   └── helpers.js
└── server.js
```

#### Flow de Petición

```
Request → Middleware → Router → Controller → Service → Database
                                                ↓
Response ← Middleware ← Controller ← Service ← Result
```

**Ejemplo:**
```javascript
// 1. Middleware (auth.js)
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

// 2. Route (book.routes.js)
router.post('/books', authMiddleware, validateBook, bookController.create);

// 3. Controller (book.controller.js)
export const create = async (req, res, next) => {
  try {
    const book = await bookService.contribute(req.user.id, req.body);
    res.status(201).json({ success: true, book });
  } catch (error) {
    next(error);
  }
};

// 4. Service (book.service.js)
export const contribute = async (userId, data) => {
  // Lógica de negocio
  const code = generateTFTCode();
  const book = await db.collection('books').add({ code, ...data });
  return book;
};
```

---

## Bases de Datos

### Firestore (Principal)

#### Colecciones

**users**
```javascript
{
  id: "user_123",                    // UID de Firebase Auth
  name: "Juan Pérez",
  email: "juan@example.com",
  avatar: "https://...",
  bio: "Amante de la literatura",
  city: "Bogotá",
  readerLevel: 5,
  booksLinked: 12,
  totalExchanges: 8,
  eventsAttended: 3,
  holdingBooks: ["book_123", "book_456"],      // Array de IDs
  contributedBooks: ["book_123"],               // Array de IDs
  badges: ["badge_1", "badge_2"],               // Array de IDs
  walletAddress: "0x...",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**books**
```javascript
{
  id: "book_123",
  code: "TFT-A3B5",                 // Código único
  title: "Cien Años de Soledad",
  author: "Gabriel García Márquez",
  isbn: "978-0307474728",
  coverUrl: "https://...",
  images: ["https://...", "https://..."],
  contributedBy: "user_123",        // Ref a users
  currentHolder: "user_456",        // Ref a users
  isAvailable: true,
  availableDate: Timestamp,
  totalExchanges: 5,
  cities: ["Bogotá", "Medellín"],
  avgReadingTime: 14,               // días
  receivedDate: Timestamp,
  history: [                        // Subcollection
    {
      userId: "user_789",
      receivedDate: Timestamp,
      returnedDate: Timestamp,
      readingTime: 15
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**badges**
```javascript
{
  id: "badge_1",
  name: "Primera Contribución",
  description: "Contribuiste tu primer libro",
  icon: "📖",
  category: "books",                // books, exchanges, events, social
  requirement: 1,
  createdAt: Timestamp
}
```

**user_badges** (subcollection de users)
```javascript
users/{userId}/badges/{badgeId}
{
  badgeId: "badge_1",
  earnedAt: Timestamp,
  progress: 5,                      // Para badges progresivos
  isUnlocked: true
}
```

**events**
```javascript
{
  id: "event_123",
  title: "Club de Lectura Mensual",
  description: "...",
  date: Timestamp,
  location: {
    name: "Biblioteca Nacional",
    address: "Calle 24 #5-60",
    city: "Bogotá",
    coordinates: { lat: 4.60, lng: -74.07 }
  },
  organizer: "user_456",
  attendees: ["user_123", "user_789"],
  maxAttendees: 50,
  imageUrl: "https://...",
  createdAt: Timestamp
}
```

#### Índices

```javascript
// Compuestos
books: { currentHolder: 'asc', isAvailable: 'asc' }
books: { cities: 'array-contains', isAvailable: 'asc' }
events: { city: 'asc', date: 'asc' }

// Simples
users: { city: 'asc' }
books: { totalExchanges: 'desc' }
```

#### Reglas de Seguridad

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Funciones auxiliares
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false;

      // Subcollection badges
      match /badges/{badgeId} {
        allow read: if isAuthenticated();
        allow write: if false; // Solo por servidor
      }
    }

    // Books
    match /books/{bookId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() &&
                       request.auth.uid == resource.data.currentHolder;
      allow delete: if false;
    }

    // Badges (solo lectura)
    match /badges/{badgeId} {
      allow read: if isAuthenticated();
      allow write: if false;
    }

    // Events
    match /events/{eventId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() &&
                       request.auth.uid == resource.data.organizer;
    }
  }
}
```

---

### Supabase Storage

#### Buckets

**book-images**
- Público: ✅
- Límite de tamaño: 5MB
- Formatos permitidos: jpg, png, webp

**user-avatars**
- Público: ✅
- Límite de tamaño: 2MB
- Formatos permitidos: jpg, png

**event-images**
- Público: ✅
- Límite de tamaño: 3MB

#### Políticas (RLS)

```sql
-- Lectura pública
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id IN ('book-images', 'user-avatars', 'event-images'));

-- Subida autenticada
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('book-images', 'user-avatars', 'event-images')
  AND auth.role() = 'authenticated'
);

-- Eliminación solo del propietario
CREATE POLICY "Owner delete"
ON storage.objects FOR DELETE
USING (auth.uid()::text = owner);
```

---

## Autenticación y Autorización

### Firebase Authentication

```
User Registration
     ↓
Create account (Firebase Auth)
     ↓
Generate JWT token
     ↓
Create user doc (Firestore)
     ↓
Return token to client
```

### JWT Flow

```typescript
// 1. Login
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const token = await userCredential.user.getIdToken();

// 2. Enviar token al backend
const response = await fetch('/api/books', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// 3. Backend verifica token
const decodedToken = await admin.auth().verifyIdToken(token);
const userId = decodedToken.uid;
```

---

## Algoritmos Clave

### 1. Generación Código TFT

```typescript
const generateTFTCode = (): string => {
  // Formato: TFT-{3 chars}{1 char}
  // Ejemplo: TFT-A3B5

  const prefix = 'TFT';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code = '';
  for (let i = 0; i < 3; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  const checksum = chars[Math.floor(Math.random() * chars.length)];

  return `${prefix}-${code}${checksum}`;
};
```

### 2. Sistema de Badges

```typescript
const BADGE_DEFINITIONS = [
  {
    id: 'first_book',
    category: 'books',
    requirement: 1,
    name: 'Primera Contribución'
  },
  {
    id: 'collector',
    category: 'books',
    requirement: 5,
    name: 'Coleccionista'
  },
  // ...
];

const checkAndAwardBadges = async (userId: string, stats: UserStats) => {
  const newBadges = [];

  for (const badge of BADGE_DEFINITIONS) {
    const userBadge = await getUserBadge(userId, badge.id);

    if (!userBadge?.isUnlocked) {
      const statValue = stats[badge.category];

      if (statValue >= badge.requirement) {
        await awardBadge(userId, badge.id);
        newBadges.push(badge);
      }
    }
  }

  return newBadges;
};
```

### 3. Algoritmo de Matching (Futuro)

```typescript
const calculateMatchScore = (userProfile: Profile, book: Book): number => {
  let score = 0;

  // 1. Ciudad (40%)
  if (userProfile.city === book.currentCity) {
    score += 0.4;
  }

  // 2. Géneros preferidos (30%)
  const genreMatch = userProfile.preferredGenres
    .some(g => book.genres.includes(g));
  if (genreMatch) score += 0.3;

  // 3. Autores favoritos (20%)
  if (userProfile.favoriteAuthors.includes(book.author)) {
    score += 0.2;
  }

  // 4. Nivel de lectura (10%)
  const levelDiff = Math.abs(userProfile.readerLevel - book.difficulty);
  if (levelDiff <= 1) score += 0.1;

  return score;
};
```

---

## Patrones de Diseño Utilizados

### 1. Repository Pattern (Futuro)
```typescript
class BookRepository {
  async findById(id: string): Promise<Book> { }
  async findAll(filters: Filters): Promise<Book[]> { }
  async create(data: BookData): Promise<Book> { }
  async update(id: string, data: Partial<Book>): Promise<Book> { }
}
```

### 2. Service Pattern
```typescript
class BookService {
  constructor(private repo: BookRepository) {}

  async contribute(userId: string, data: BookData): Promise<string> {
    // Lógica compleja aquí
  }
}
```

### 3. Context Pattern (React)
```typescript
const AuthContext = createContext<AuthContextType>();

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4. Higher-Order Component (HOC)
```typescript
const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
};
```

---

## Escalabilidad

### Horizontal Scaling

1. **Frontend**: CDN (Cloudflare, Vercel Edge)
2. **Backend**: Load Balancer + Multiple instances
3. **Database**: Firestore auto-escala
4. **Storage**: Supabase auto-escala

### Vertical Scaling

- Optimización de queries
- Caché con Redis (futuro)
- Lazy loading de imágenes
- Code splitting

### Estrategias de Caché

```typescript
// 1. React Query (futuro)
const { data } = useQuery('books', fetchBooks, {
  staleTime: 5 * 60 * 1000,  // 5 minutos
  cacheTime: 10 * 60 * 1000  // 10 minutos
});

// 2. Service Worker (futuro)
// Cache de imágenes y assets estáticos

// 3. LocalStorage
// Cache de perfil de usuario
localStorage.setItem('userProfile', JSON.stringify(profile));
```

---

## Monitoreo y Observabilidad

### Métricas Clave

1. **Performance**
   - Tiempo de respuesta API
   - Tiempo de carga de página
   - Core Web Vitals

2. **Negocio**
   - Usuarios activos
   - Libros contribuidos/día
   - Intercambios completados
   - Tasa de conversión

3. **Errores**
   - Error rate
   - Error types
   - Failed requests

### Herramientas Propuestas

- **Frontend**: Google Analytics, Sentry
- **Backend**: Winston logs, Datadog
- **Database**: Firebase Console
- **Uptime**: UptimeRobot

---

## Seguridad

### Principios

1. **Defensa en profundidad**
   - Validación en frontend Y backend
   - HTTPS obligatorio
   - Sanitización de inputs

2. **Principio de menor privilegio**
   - Permisos mínimos en Firestore
   - JWT con tiempo de expiración

3. **Seguridad por diseño**
   - No secrets en código
   - Environment variables
   - Security headers

### Checklist de Seguridad

- [x] HTTPS en producción
- [x] Firestore Security Rules
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection prevention (N/A - NoSQL)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Dependency scanning

---

## Limitaciones Actuales

1. **Backend incompleto** - Solo endpoints básicos
2. **Sin tests** - Falta suite de testing
3. **Sin CI/CD** - Deploy manual
4. **Mezcla Firebase + Supabase** - Debe unificarse
5. **Sin caché** - Todas las requests van a DB
6. **Sin real-time** - No hay WebSockets

---

## Roadmap Técnico

### Fase 1 (MVP - Actual)
- [x] Autenticación básica
- [x] CRUD libros (frontend)
- [ ] API completa backend
- [ ] Sistema de intercambios

### Fase 2
- [ ] Tests unitarios + integración
- [ ] CI/CD pipeline
- [ ] Notificaciones push
- [ ] Chat real-time

### Fase 3
- [ ] Microservicios
- [ ] GraphQL API
- [ ] App móvil (React Native)
- [ ] Blockchain integration

---

**Última actualización:** Octubre 2025
