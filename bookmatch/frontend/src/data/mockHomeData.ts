// Centralized mock data for HomePage

import { Activity } from '../components/home/feed/ActivityFeed';

// Actividades de intercambio (NO posts de redes sociales)
export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'exchange',
    user: {
      name: 'María García',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      username: 'mariag'
    },
    exchangeWith: {
      name: 'Carlos Méndez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      username: 'carlosm'
    },
    book: {
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      cover: 'https://m.media-amazon.com/images/I/81d1sANmNQL._AC_UF1000,1000_QL80_.jpg'
    },
    timestamp: 'Hace 2 horas',
    likes: 12,
    comments: 3,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    type: 'new_book',
    user: {
      name: 'Carlos Méndez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      username: 'carlosm'
    },
    book: {
      title: 'El amor en los tiempos del cólera',
      author: 'Gabriel García Márquez',
      cover: 'https://m.media-amazon.com/images/I/81d1sANmNQL._AC_UF1000,1000_QL80_.jpg'
    },
    timestamp: 'Hace 5 horas',
    likes: 8,
    comments: 2,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 3,
    type: 'review',
    user: {
      name: 'Ana Torres',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      username: 'anatorres'
    },
    book: {
      title: '1984',
      author: 'George Orwell',
      cover: 'https://m.media-amazon.com/images/I/81d1sANmNQL._AC_UF1000,1000_QL80_.jpg'
    },
    rating: 5,
    reviewText: 'Obra maestra distópica que sigue siendo relevante hoy en día',
    timestamp: 'Hace 8 horas',
    likes: 15,
    comments: 5,
    isLiked: true,
    isBookmarked: true
  },
  {
    id: 4,
    type: 'achievement',
    user: {
      name: 'Luis Ramírez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      username: 'luisr'
    },
    achievement: {
      title: 'Bibliófilo Activo',
      icon: '🏆',
      description: 'Completó 10 intercambios exitosos'
    },
    timestamp: 'Hace 1 día',
    likes: 23,
    comments: 7,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 5,
    type: 'request',
    user: {
      name: 'Sofía Vargas',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      username: 'sofiv'
    },
    requestBook: {
      title: 'La sombra del viento',
      author: 'Carlos Ruiz Zafón'
    },
    timestamp: 'Hace 2 días',
    likes: 5,
    comments: 3,
    isLiked: false,
    isBookmarked: false
  }
];

export const mockPosts = [
  {
    id: 1,
    user: {
      name: 'María García',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      username: 'mariag'
    },
    content: '¡Acabo de terminar "Cien años de soledad" de Gabriel García Márquez! ¿Alguien más lo ha leído? Me encantaría discutir sobre el realismo mágico en los comentarios. #LiteraturaLatinoamericana #Gabo',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80',
    likes: 42,
    comments: 15,
    shares: 5,
    isLiked: false,
    isBookmarked: false,
    timestamp: '2h',
    book: {
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      cover: 'https://m.media-amazon.com/images/I/81d1sANmNQL._AC_UF1000,1000_QL80_.jpg'
    }
  },
  {
    id: 2,
    user: {
      name: 'Carlos Méndez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      username: 'carlosm'
    },
    content: 'Recomendación del día: "El amor en los tiempos del cólera". Una historia de amor que trasciende el tiempo. ¿Cuál es su libro favorito de García Márquez?',
    image: '',
    likes: 28,
    comments: 8,
    shares: 3,
    isLiked: true,
    isBookmarked: true,
    timestamp: '5h',
    book: {
      title: 'El amor en los tiempos del cólera',
      author: 'Gabriel García Márquez',
      cover: 'https://m.media-amazon.com/images/I/81d1sANmNQL._AC_UF1000,1000_QL80_.jpg'
    }
  },
  {
    id: 3,
    user: {
      name: 'BookLover42',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      username: 'booklover42'
    },
    content: '¡Nuevo en mi biblioteca! "La sombra del viento" de Carlos Ruiz Zafón. ¿Vale la pena leerlo? #LibrosEnEspañol #LiteraturaEspañola',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    likes: 35,
    comments: 12,
    shares: 7,
    isLiked: false,
    isBookmarked: false,
    timestamp: '1d',
    book: {
      title: 'La sombra del viento',
      author: 'Carlos Ruiz Zafón',
      cover: 'https://m.media-amazon.com/images/I/81d1sANmNQL._AC_UF1000,1000_QL80_.jpg'
    }
  }
];

export const suggestedUsers = [
  { id: 1, name: 'Ana Torres', username: 'anatorres', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { id: 2, name: 'Luis Ramírez', username: 'luisr', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 3, name: 'Sofía Vargas', username: 'sofiv', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' }
];

export const categories = [
  { name: 'Ficción', color: 'primary.main' },
  { name: 'No Ficción', color: 'secondary.main' },
  { name: 'Ciencia Ficción', color: 'success.main' },
  { name: 'Fantasía', color: 'warning.main' },
  { name: 'Romance', color: 'error.main' },
  { name: 'Misterio', color: 'info.main' },
];

export const topExchangedBooks = [
  {
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    exchanges: 47,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    currentHolder: 'María G.',
    holderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    category: 'Realismo Mágico'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    exchanges: 42,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    currentHolder: 'Carlos L.',
    holderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    category: 'Distopía'
  },
  {
    id: 3,
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    exchanges: 65,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=400&fit=crop',
    currentHolder: 'Ana M.',
    holderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    category: 'Literatura Infantil'
  },
  {
    id: 4,
    title: 'Crimen y Castigo',
    author: 'Fiódor Dostoievski',
    exchanges: 38,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    currentHolder: 'Luis R.',
    holderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    category: 'Clásico'
  },
  {
    id: 5,
    title: 'El amor en los tiempos del cólera',
    author: 'Gabriel García Márquez',
    exchanges: 38,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    currentHolder: 'Sara P.',
    holderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    category: 'Romance'
  }
];

export const topSellingBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    sales: 156,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop',
    price: 45000,
    category: 'Autoayuda'
  },
  {
    id: 2,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    sales: 142,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    price: 52000,
    category: 'Historia'
  },
  {
    id: 3,
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    sales: 128,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=400&fit=crop',
    price: 28000,
    category: 'Clásico'
  },
  {
    id: 4,
    title: 'El sutil arte de que te importe un carajo',
    author: 'Mark Manson',
    sales: 119,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    price: 38000,
    category: 'Autoayuda'
  },
  {
    id: 5,
    title: '1984',
    author: 'George Orwell',
    sales: 105,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    price: 35000,
    category: 'Distopía'
  }
];

export const readingRecommendations = [
  {
    id: 1,
    title: 'El nombre del viento',
    author: 'Patrick Rothfuss',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    reason: 'Basado en tu amor por la fantasía épica y narrativas complejas',
    matchScore: 95,
    genres: ['Fantasía', 'Aventura', 'Magia'],
    readBy: ['María', 'Carlos', 'Ana', 'Luis'],
    available: true
  },
  {
    id: 2,
    title: 'Neuromante',
    author: 'William Gibson',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    reason: 'Te encantará si disfrutaste 1984 y Fahrenheit 451',
    matchScore: 88,
    genres: ['Ciencia Ficción', 'Cyberpunk'],
    readBy: ['Pedro', 'Sofía'],
    available: true
  },
  {
    id: 3,
    title: 'Los pilares de la Tierra',
    author: 'Ken Follett',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    reason: 'Perfecta para amantes de novelas históricas épicas',
    matchScore: 82,
    genres: ['Histórica', 'Drama'],
    readBy: ['Elena', 'Jorge', 'Marta'],
    available: false
  }
];

export const allies = [
  {
    id: 1,
    name: 'Café Literario El Péndulo',
    type: 'Cafetería',
    offer: '20% en bebidas y postres',
    icon: 'cafe' as const,
    address: 'Calle 72 #10-34, Bogotá',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Librería El Ateneo',
    type: 'Librería',
    offer: '10% de descuento en libros nuevos',
    icon: 'bookstore' as const,
    address: 'Carrera 15 #85-23, Bogotá',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Co-working La Nube',
    type: 'Coworking',
    offer: 'Primera hora gratis en sala de reuniones',
    icon: 'coworking' as const,
    address: 'Avenida 19 #103-85, Bogotá',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Editorial Planeta',
    type: 'Editorial',
    offer: 'Acceso anticipado a lanzamientos',
    icon: 'bookstore' as const,
    address: 'Calle 93 #13-24, Bogotá',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=100&h=100&fit=crop'
  },
  {
    id: 5,
    name: 'Librería Nacional',
    type: 'Librería',
    offer: '15% en compras superiores a $100.000',
    icon: 'bookstore' as const,
    address: 'Centro Comercial Andino, Bogotá',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=100&h=100&fit=crop'
  },
  {
    id: 6,
    name: 'Café Libro',
    type: 'Cafetería',
    offer: 'Café gratis con intercambio de libro',
    icon: 'cafe' as const,
    address: 'Carrera 7 #63-42, Bogotá',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop'
  }
];

export const trendingHashtags = [
  '#Literatura',
  '#Libros',
  '#Lectura',
  '#Bookstagram',
  '#BookLover',
  '#BookClub'
];

export const features = [
  {
    title: 'Comunidad de lectores',
    description: 'Conecta con otros amantes de los libros y comparte tus lecturas favoritas.',
    icon: 'community'
  },
  {
    title: 'Descubre nuevos libros',
    description: 'Encuentra tu próxima lectura basada en tus intereses y preferencias.',
    icon: 'book'
  },
  {
    title: 'Club de lectura virtual',
    description: 'Participa en discusiones y eventos con otros miembros de la comunidad.',
    icon: 'event'
  }
];
