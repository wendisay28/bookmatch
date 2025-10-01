import { Book, Badge, Exchange, UserData } from '../types/profile';

export const userData: UserData = {
  userId: 'user-007-gabo',
  name: "Sofía Martínez",
  memberSince: "Enero 2024",
  photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop",
  quote: "\"No hay amigo más leal que un libro\" — Ernest Hemingway",
  readerLevel: 4,
  levelProgressPercent: 35,
  nextLevelAt: 50,
  booksLinked: 45,
  avgTimeKeptDays: 7.4,
  maxBooksRequestedRecord: 12,
  totalExchanges: 23,
  eventsAttended: 12,
  challengesCompleted: 8,
  collectibles: 15,
  currentBook: {
    id: 1,
    title: "El arte de la guerra",
    author: "Sun Tzu",
    code: "TFT-001A",
    progress: 67,
    cover: "https://placehold.co/80x120/14B8A6/ffffff?text=ACTUAL"
  },
  definingBooks: [
    { 
      id: 2,
      title: "Cien años de soledad", 
      author: "Gabriel García Márquez",
      cover: "https://placehold.co/100x150/5B21B6/ffffff?text=GGM"
    },
    { 
      id: 3,
      title: "El nombre del viento", 
      author: "Patrick Rothfuss",
      cover: "https://placehold.co/100x150/EAB308/000000?text=PR"
    },
    { 
      id: 4,
      title: "Rayuela", 
      author: "Julio Cortázar",
      cover: "https://placehold.co/100x150/6D28D9/ffffff?text=JC"
    }
  ]
};

export const myBooksList: Book[] = [
  { 
    id: 101, 
    title: 'Cien años de soledad', 
    author: 'Gabriel García Márquez', 
    code: 'TFT-001A', 
    exchanges: 4, 
    cities: ['BOG', 'MED', 'CAL'], 
    avgTime: 8, 
    current: 'Laura V.', 
    cover: 'https://placehold.co/100x150/5B21B6/ffffff?text=GGM' 
  },
  { 
    id: 102, 
    title: 'El laberinto de la soledad', 
    author: 'Octavio Paz', 
    code: 'TFT-002B', 
    exchanges: 2, 
    cities: ['BOG', 'MEX'], 
    avgTime: 10, 
    current: 'Carlos J.', 
    cover: 'https://placehold.co/100x150/CA8A04/ffffff?text=OP' 
  },
  { 
    id: 103, 
    title: 'Rayuela', 
    author: 'Julio Cortázar', 
    code: 'TFT-003C', 
    exchanges: 7, 
    cities: ['BOG', 'CDMX', 'MAD'], 
    avgTime: 5, 
    current: 'María S.', 
    cover: 'https://placehold.co/100x150/6D28D9/ffffff?text=JC' 
  }
];

export const exchangeHistory: Exchange[] = [
  { 
    id: 1, 
    title: "Cien años de soledad", 
    type: "Intercambio", 
    date: "15/07/2025", 
    status: "Completado" 
  },
  { 
    id: 2, 
    title: "El nombre del viento", 
    type: "Préstamo", 
    date: "01/08/2025", 
    status: "Completado" 
  },
  { 
    id: 3, 
    title: "Don Quijote de la Mancha", 
    type: "Intercambio", 
    date: "10/09/2025", 
    status: "En Proceso" 
  }
];

export const badges: Badge[] = [
  { 
    id: 1, 
    name: "Explorador Literario", 
    icon: "🧭", 
    description: "Completó su primer intercambio.",
    rarity: "uncommon"
  },
  { 
    id: 2, 
    name: "Top Lector", 
    icon: "👑", 
    description: "Intercambió 10+ libros en un solo mes.",
    rarity: "legendary"
  },
  { 
    id: 3, 
    name: "Guardián de Libros", 
    icon: "🛡️", 
    description: "Tiempo promedio de devolución ejemplar.",
    rarity: "epic"
  },
  { 
    id: 4, 
    name: "Curador de Colección", 
    icon: "📚", 
    description: "Ha vinculado más de 30 libros.",
    rarity: "rare"
  },
  { 
    id: 5, 
    name: "Networker Pro", 
    icon: "🤝", 
    description: "Participó en 10+ eventos del club.",
    rarity: "epic"
  },
  { 
    id: 6, 
    name: "Anfitrión", 
    icon: "🎭", 
    description: "Organizó su primer evento comunitario.",
    rarity: "uncommon"
  }
];
