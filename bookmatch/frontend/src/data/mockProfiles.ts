export interface Book {
  title: string;
  author: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  distance: number;
  photo?: string;
  compatibility: number;
  rating: number;
  interests?: string[];
  favoriteBook?: Book;
  bio?: string;
}

export const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'María García',
    age: 28,
    location: 'Madrid',
    distance: 5,
    photo: '/profile1.jpg',
    compatibility: 85,
    rating: 4.5,
    interests: ['Ficción', 'Romance', 'Fantasía', 'Poesía'],
    favoriteBook: {
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez'
    },
    bio: 'Amante de la literatura latinoamericana y los cafés tranquilos. Me encanta perderme en historias que transportan a otros mundos.'
  },
  {
    id: '2',
    name: 'Carlos López',
    age: 32,
    location: 'Barcelona',
    distance: 10,
    photo: '/profile2.jpg',
    compatibility: 78,
    rating: 4.2,
    interests: ['Ciencia ficción', 'Tecnología', 'Historia', 'Filosofía'],
    favoriteBook: {
      title: '1984',
      author: 'George Orwell'
    },
    bio: 'Ingeniero de día, lector empedernido de noche. Busco conversaciones profundas sobre distopías y futuros posibles.'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    age: 26,
    location: 'Valencia',
    distance: 8,
    photo: '/profile3.jpg',
    compatibility: 92,
    rating: 4.8,
    interests: ['Poesía', 'Arte', 'Viajes', 'Filosofía', 'Música'],
    favoriteBook: {
      title: 'Rayuela',
      author: 'Julio Cortázar'
    },
    bio: 'Poeta y viajera. Busco alguien con quien compartir conversaciones profundas sobre libros, arte y la vida. Me encanta descubrir nuevas cafeterías y librerías en cada ciudad que visito.'
  },
  {
    id: '4',
    name: 'Diego Ruiz',
    age: 30,
    location: 'Sevilla',
    distance: 12,
    photo: '/profile4.jpg',
    compatibility: 81,
    rating: 4.3,
    interests: ['Thriller', 'Misterio', 'Cine', 'Música'],
    favoriteBook: {
      title: 'El nombre de la rosa',
      author: 'Umberto Eco'
    },
    bio: 'Fan de los misterios y las novelas de suspense. Si te gustan las historias que te mantienen despierto hasta tarde, conectemos.'
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    age: 25,
    location: 'Bilbao',
    distance: 15,
    photo: '/profile5.jpg',
    compatibility: 88,
    rating: 4.6,
    interests: ['Fantasía', 'YA', 'Comics', 'Gaming'],
    favoriteBook: {
      title: 'El nombre del viento',
      author: 'Patrick Rothfuss'
    },
    bio: 'Adicta a la fantasía épica y los mundos imaginarios. Siempre en busca de la próxima gran aventura literaria.'
  },
  {
    id: '6',
    name: 'Javier Moreno',
    age: 29,
    location: 'Granada',
    distance: 7,
    photo: '/profile6.jpg',
    compatibility: 76,
    rating: 4.1,
    interests: ['Historia', 'Biografías', 'Política', 'Economía'],
    favoriteBook: {
      title: 'Sapiens',
      author: 'Yuval Noah Harari'
    },
    bio: 'Apasionado por la historia y cómo ha moldeado nuestro presente. Me fascinan las biografías de personajes históricos.'
  },
  {
    id: '7',
    name: 'Elena Torres',
    age: 27,
    location: 'Málaga',
    distance: 6,
    photo: '/profile7.jpg',
    compatibility: 90,
    rating: 4.7,
    interests: ['Romance', 'Drama', 'Literatura clásica', 'Teatro'],
    favoriteBook: {
      title: 'Orgullo y prejuicio',
      author: 'Jane Austen'
    },
    bio: 'Romántica empedernida que cree en el poder de las buenas historias. Amante de los clásicos y el teatro.'
  },
  {
    id: '8',
    name: 'Pablo Fernández',
    age: 31,
    location: 'Zaragoza',
    distance: 20,
    photo: '/profile8.jpg',
    compatibility: 83,
    rating: 4.4,
    interests: ['Ciencia', 'Divulgación', 'Astronomía', 'Naturaleza'],
    favoriteBook: {
      title: 'Cosmos',
      author: 'Carl Sagan'
    },
    bio: 'Curioso del universo y todo lo que nos rodea. Me encanta la divulgación científica y los debates filosóficos.'
  }
];
