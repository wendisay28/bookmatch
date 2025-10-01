export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: 'club' | 'presentacion' | 'firma' | 'taller' | 'conferencia';
  image?: string;
  attendees: number;
  maxAttendees?: number;
  price: number;
  organizer: string;
  book?: {
    title: string;
    author: string;
  };
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Club de Lectura: Realismo Mágico',
    description: 'Únete a nuestro club de lectura mensual donde discutiremos las obras más emblemáticas del realismo mágico latinoamericano. Este mes: Cien años de soledad.',
    date: '2025-11-15',
    time: '19:00',
    location: 'Librería Cervantes',
    address: 'Calle Mayor 45, Madrid',
    category: 'club',
    image: '/events/club-realismo.jpg',
    attendees: 12,
    maxAttendees: 20,
    price: 0,
    organizer: 'Librería Cervantes',
    book: {
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez'
    }
  },
  {
    id: '2',
    title: 'Presentación: Nuevas Voces de la Literatura',
    description: 'Presentación de autores emergentes que están revolucionando la escena literaria española. Incluye firma de libros y cóctel.',
    date: '2025-11-08',
    time: '18:30',
    location: 'Casa del Libro',
    address: 'Gran Vía 29, Madrid',
    category: 'presentacion',
    image: '/events/nuevas-voces.jpg',
    attendees: 45,
    maxAttendees: 60,
    price: 5,
    organizer: 'Casa del Libro'
  },
  {
    id: '3',
    title: 'Firma de Libros: Dolores Redondo',
    description: 'Encuentro con la autora Dolores Redondo para la firma de su última novela. Oportunidad única de conocer a la autora en persona.',
    date: '2025-11-20',
    time: '17:00',
    location: 'FNAC Barcelona',
    address: 'Plaça Catalunya 4, Barcelona',
    category: 'firma',
    image: '/events/firma-redondo.jpg',
    attendees: 78,
    maxAttendees: 100,
    price: 0,
    organizer: 'FNAC',
    book: {
      title: 'Esperando al diluvio',
      author: 'Dolores Redondo'
    }
  },
  {
    id: '4',
    title: 'Taller de Escritura Creativa',
    description: 'Aprende las técnicas fundamentales de la escritura creativa con nuestra escritora residente. Incluye ejercicios prácticos y feedback personalizado.',
    date: '2025-11-12',
    time: '16:00',
    location: 'Centro Cultural La Nau',
    address: 'Calle Universidad 2, Valencia',
    category: 'taller',
    image: '/events/taller-escritura.jpg',
    attendees: 8,
    maxAttendees: 15,
    price: 25,
    organizer: 'Centro Cultural La Nau'
  },
  {
    id: '5',
    title: 'Conferencia: El Futuro de la Ciencia Ficción',
    description: 'Mesa redonda con autores de ciencia ficción contemporánea discutiendo sobre el futuro del género y las nuevas tendencias.',
    date: '2025-11-25',
    time: '19:30',
    location: 'Ateneo de Madrid',
    address: 'Calle del Prado 21, Madrid',
    category: 'conferencia',
    image: '/events/conf-scifi.jpg',
    attendees: 52,
    maxAttendees: 80,
    price: 8,
    organizer: 'Ateneo de Madrid'
  },
  {
    id: '6',
    title: 'Club de Lectura: Clásicos de Fantasía',
    description: 'Exploramos los grandes clásicos de la fantasía épica. Este mes discutiremos El Señor de los Anillos.',
    date: '2025-11-18',
    time: '20:00',
    location: 'Librería Gigamesh',
    address: 'Carrer de Còrsega 372, Barcelona',
    category: 'club',
    image: '/events/club-fantasia.jpg',
    attendees: 15,
    maxAttendees: 20,
    price: 0,
    organizer: 'Librería Gigamesh',
    book: {
      title: 'El Señor de los Anillos',
      author: 'J.R.R. Tolkien'
    }
  },
  {
    id: '7',
    title: 'Taller de Poesía Contemporánea',
    description: 'Sumérgete en el mundo de la poesía contemporánea. Aprende técnicas de escritura y análisis poético con poetas reconocidos.',
    date: '2025-11-22',
    time: '18:00',
    location: 'Café Literario',
    address: 'Calle Poeta Querol 15, Valencia',
    category: 'taller',
    image: '/events/taller-poesia.jpg',
    attendees: 10,
    maxAttendees: 12,
    price: 20,
    organizer: 'Café Literario'
  },
  {
    id: '8',
    title: 'Presentación: Literatura de Viajes',
    description: 'Charla sobre literatura de viajes con autores que han recorrido el mundo documentando sus experiencias.',
    date: '2025-11-28',
    time: '19:00',
    location: 'Centro Andaluz de las Letras',
    address: 'Calle Esparteros 8, Sevilla',
    category: 'presentacion',
    image: '/events/lit-viajes.jpg',
    attendees: 30,
    maxAttendees: 50,
    price: 3,
    organizer: 'Centro Andaluz de las Letras'
  }
];

export const eventCategories = {
  club: 'Club de Lectura',
  presentacion: 'Presentación',
  firma: 'Firma de Libros',
  taller: 'Taller',
  conferencia: 'Conferencia'
};
