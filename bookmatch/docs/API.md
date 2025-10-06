# 📡 API Documentation - BookMatch

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.bookmatch.com/api
```

## Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

```http
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### POST `/auth/register`

Registra un nuevo usuario en el sistema.

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "firebase_uid_here",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2025-10-06T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**
- `400` - Email ya registrado
- `400` - Validación fallida
- `500` - Error del servidor

---

#### POST `/auth/login`

Inicia sesión de un usuario existente.

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "firebase_uid_here",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**
- `401` - Credenciales inválidas
- `404` - Usuario no encontrado

---

### Books

#### POST `/books`
🔒 **Requiere autenticación**

Contribuye un nuevo libro al sistema TFT.

**Request:**
```json
{
  "title": "Cien Años de Soledad",
  "author": "Gabriel García Márquez",
  "isbn": "978-0307474728",
  "city": "Bogotá",
  "coverUrl": "https://example.com/cover.jpg"
}
```

**Con imágenes:**
```http
POST /api/books
Content-Type: multipart/form-data

title=Cien Años de Soledad
author=Gabriel García Márquez
city=Bogotá
images[]=<file1>
images[]=<file2>
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Libro contribuido exitosamente",
  "book": {
    "id": "book_id_123",
    "code": "TFT-A3B5",
    "title": "Cien Años de Soledad",
    "author": "Gabriel García Márquez",
    "isbn": "978-0307474728",
    "coverUrl": "https://supabase.co/storage/books/...",
    "images": [
      "https://supabase.co/storage/books/image1.jpg",
      "https://supabase.co/storage/books/image2.jpg"
    ],
    "contributedBy": "user_id",
    "currentHolder": "user_id",
    "isAvailable": false,
    "totalExchanges": 0,
    "cities": ["Bogotá"],
    "createdAt": "2025-10-06T10:30:00Z"
  }
}
```

**Errores:**
- `400` - Datos inválidos
- `401` - No autenticado
- `413` - Imágenes muy grandes

---

#### GET `/books`
🔒 **Requiere autenticación**

Lista todos los libros disponibles.

**Query Params:**
- `limit` (number) - Límite de resultados (default: 20)
- `page` (number) - Página (default: 1)
- `city` (string) - Filtrar por ciudad
- `available` (boolean) - Solo libros disponibles
- `search` (string) - Buscar por título o autor

**Ejemplo:**
```
GET /api/books?limit=10&city=Bogotá&available=true&search=García
```

**Response:** `200 OK`
```json
{
  "success": true,
  "total": 150,
  "page": 1,
  "limit": 10,
  "books": [
    {
      "id": "book_123",
      "code": "TFT-A3B5",
      "title": "Cien Años de Soledad",
      "author": "Gabriel García Márquez",
      "coverUrl": "https://...",
      "isAvailable": true,
      "currentHolder": {
        "id": "user_123",
        "name": "Juan Pérez"
      },
      "cities": ["Bogotá"],
      "totalExchanges": 5
    }
  ]
}
```

---

#### GET `/books/:id`
🔒 **Requiere autenticación**

Obtiene detalles de un libro específico.

**Response:** `200 OK`
```json
{
  "success": true,
  "book": {
    "id": "book_123",
    "code": "TFT-A3B5",
    "title": "Cien Años de Soledad",
    "author": "Gabriel García Márquez",
    "isbn": "978-0307474728",
    "coverUrl": "https://...",
    "images": ["https://..."],
    "contributedBy": {
      "id": "user_456",
      "name": "María González"
    },
    "currentHolder": {
      "id": "user_123",
      "name": "Juan Pérez"
    },
    "isAvailable": true,
    "availableDate": "2025-10-10T10:00:00Z",
    "totalExchanges": 5,
    "cities": ["Bogotá", "Medellín", "Cali"],
    "avgReadingTime": 14,
    "history": [
      {
        "userId": "user_789",
        "userName": "Carlos López",
        "receivedDate": "2025-09-15T10:00:00Z",
        "returnedDate": "2025-09-29T10:00:00Z",
        "readingTime": 14
      }
    ],
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-10-06T10:00:00Z"
  }
}
```

**Errores:**
- `404` - Libro no encontrado

---

#### POST `/books/:id/transfer`
🔒 **Requiere autenticación**

Transfiere un libro a otro usuario usando código TFT.

**Request:**
```json
{
  "recipientId": "user_789",
  "message": "Disfrutá esta lectura!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Libro transferido exitosamente",
  "transfer": {
    "bookId": "book_123",
    "fromUser": "user_123",
    "toUser": "user_789",
    "transferDate": "2025-10-06T10:30:00Z",
    "readingTime": 15
  },
  "newBadges": [
    {
      "id": "badge_intercambio_5",
      "name": "Intercambiador",
      "description": "5 intercambios realizados"
    }
  ]
}
```

**Errores:**
- `400` - No eres el poseedor actual
- `404` - Libro o receptor no encontrado
- `409` - Libro no disponible

---

#### PUT `/books/:id/availability`
🔒 **Requiere autenticación**

Marca un libro como disponible o no disponible para intercambio.

**Request:**
```json
{
  "isAvailable": true,
  "availableDate": "2025-10-15T10:00:00Z"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Disponibilidad actualizada",
  "book": {
    "id": "book_123",
    "isAvailable": true,
    "availableDate": "2025-10-15T10:00:00Z"
  }
}
```

---

### Users

#### GET `/users/:id`
🔒 **Requiere autenticación**

Obtiene el perfil público de un usuario.

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "Juan Pérez",
    "avatar": "https://...",
    "bio": "Amante de la literatura latinoamericana",
    "city": "Bogotá",
    "readerLevel": 5,
    "stats": {
      "booksLinked": 12,
      "totalExchanges": 8,
      "eventsAttended": 3,
      "avgReadingTime": 12
    },
    "badges": [
      {
        "id": "badge_1",
        "name": "Bibliófilo",
        "icon": "📚",
        "earnedAt": "2025-09-15T10:00:00Z"
      }
    ],
    "holdingBooks": [
      {
        "id": "book_123",
        "title": "Cien Años de Soledad",
        "coverUrl": "https://...",
        "isAvailable": true
      }
    ],
    "createdAt": "2025-06-01T10:00:00Z"
  }
}
```

---

#### PUT `/users/:id`
🔒 **Requiere autenticación (solo propio perfil)**

Actualiza el perfil del usuario.

**Request:**
```json
{
  "name": "Juan P.",
  "bio": "Nueva biografía",
  "city": "Medellín",
  "avatar": "https://..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Perfil actualizado",
  "user": {
    "id": "user_123",
    "name": "Juan P.",
    "bio": "Nueva biografía",
    "city": "Medellín",
    "avatar": "https://..."
  }
}
```

**Errores:**
- `403` - No autorizado para editar este perfil

---

#### GET `/users/:id/badges`
🔒 **Requiere autenticación**

Obtiene todas las insignias del usuario.

**Response:** `200 OK`
```json
{
  "success": true,
  "badges": [
    {
      "id": "badge_1",
      "name": "Primera Contribución",
      "description": "Contribuiste tu primer libro",
      "icon": "📖",
      "category": "books",
      "requirement": 1,
      "earnedAt": "2025-08-15T10:00:00Z",
      "isUnlocked": true
    },
    {
      "id": "badge_2",
      "name": "Coleccionista",
      "description": "5 libros vinculados",
      "icon": "📚",
      "category": "books",
      "requirement": 5,
      "progress": 3,
      "isUnlocked": false
    }
  ]
}
```

---

### Events

#### GET `/events`
🔒 **Requiere autenticación**

Lista eventos de intercambio de libros.

**Query Params:**
- `city` (string) - Filtrar por ciudad
- `upcoming` (boolean) - Solo eventos próximos
- `limit` (number) - Límite de resultados

**Response:** `200 OK`
```json
{
  "success": true,
  "events": [
    {
      "id": "event_123",
      "title": "Club de Lectura Mensual",
      "description": "Intercambio y discusión de libros",
      "date": "2025-10-20T18:00:00Z",
      "location": {
        "name": "Biblioteca Nacional",
        "address": "Calle 24 #5-60, Bogotá",
        "city": "Bogotá"
      },
      "attendees": 25,
      "maxAttendees": 50,
      "organizer": {
        "id": "user_456",
        "name": "María González"
      },
      "imageUrl": "https://..."
    }
  ]
}
```

---

#### POST `/events/:id/attend`
🔒 **Requiere autenticación**

Registra asistencia a un evento.

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Asistencia registrada",
  "event": {
    "id": "event_123",
    "title": "Club de Lectura Mensual",
    "attendees": 26
  },
  "newBadges": [
    {
      "id": "badge_social_3",
      "name": "Social",
      "description": "Asististe a 3 eventos"
    }
  ]
}
```

---

### Matches

#### GET `/matches/recommend`
🔒 **Requiere autenticación**

Obtiene recomendaciones de libros basadas en el perfil del usuario.

**Query Params:**
- `limit` (number) - Cantidad de recomendaciones

**Response:** `200 OK`
```json
{
  "success": true,
  "recommendations": [
    {
      "bookId": "book_456",
      "title": "El Amor en los Tiempos del Cólera",
      "author": "Gabriel García Márquez",
      "coverUrl": "https://...",
      "matchScore": 0.95,
      "reason": "Basado en tus libros de García Márquez",
      "currentHolder": {
        "id": "user_789",
        "name": "Carlos López",
        "city": "Bogotá"
      },
      "isAvailable": true
    }
  ]
}
```

---

### Health

#### GET `/health`
🔓 **Público**

Verifica el estado del servidor.

**Response:** `200 OK`
```json
{
  "status": "ok",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2025-10-06T10:30:00Z",
  "version": "1.0.0",
  "services": {
    "firebase": "connected",
    "supabase": "connected"
  }
}
```

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - No autorizado |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: email duplicado) |
| 413 | Payload Too Large - Archivo muy grande |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Error del servidor |

---

## Rate Limiting

Límites por endpoint:

- **Authentication**: 5 requests / minuto
- **General**: 100 requests / 15 minutos
- **Upload**: 10 requests / hora

**Headers de respuesta:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1696588200
```

---

## Webhooks

### Book Transfer
Se dispara cuando un libro es transferido.

```json
{
  "event": "book.transferred",
  "timestamp": "2025-10-06T10:30:00Z",
  "data": {
    "bookId": "book_123",
    "fromUserId": "user_123",
    "toUserId": "user_789",
    "transferDate": "2025-10-06T10:30:00Z"
  }
}
```

### Badge Earned
Se dispara cuando un usuario gana una insignia.

```json
{
  "event": "badge.earned",
  "timestamp": "2025-10-06T10:30:00Z",
  "data": {
    "userId": "user_123",
    "badgeId": "badge_5",
    "badgeName": "Intercambiador"
  }
}
```

---

## Ejemplos de Uso

### JavaScript (Fetch)

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Get books
const getBooks = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/books', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
};
```

### cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "SecurePass123!"
  }'

# Get books
curl -X GET http://localhost:5000/api/books \
  -H "Authorization: Bearer YOUR_TOKEN"

# Contribute book with images
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Cien Años de Soledad" \
  -F "author=Gabriel García Márquez" \
  -F "city=Bogotá" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

---

## Errores Comunes

### Error de Autenticación
```json
{
  "success": false,
  "error": "Token inválido o expirado",
  "code": "AUTH_INVALID_TOKEN"
}
```

### Error de Validación
```json
{
  "success": false,
  "error": "Validación fallida",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    },
    {
      "field": "password",
      "message": "Contraseña debe tener al menos 6 caracteres"
    }
  ]
}
```

### Error de Libro No Disponible
```json
{
  "success": false,
  "error": "Este libro no está disponible para intercambio",
  "code": "BOOK_NOT_AVAILABLE",
  "availableDate": "2025-10-15T10:00:00Z"
}
```

---

## Changelog

### v1.0.0 (Actual)
- Endpoints básicos de autenticación
- CRUD de libros
- Sistema de badges
- Eventos

### Próximas versiones
- v1.1: Chat entre usuarios
- v1.2: Notificaciones push
- v2.0: Marketplace y NFTs

---

**Última actualización:** Octubre 2025
