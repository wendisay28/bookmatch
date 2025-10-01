export interface BookDetail {
  id: string;
  title: string;
  author: string;
  cover?: string;
  genre: string[];
  rating: number;
  description: string;
  year: number;
  pages: number;
  isbn?: string;
}

export const mockBooks: BookDetail[] = [
  {
    id: '1',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    cover: '/books/cien-anos.jpg',
    genre: ['Realismo mágico', 'Ficción', 'Clásico'],
    rating: 4.8,
    description: 'La obra maestra de García Márquez narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.',
    year: 1967,
    pages: 417,
    isbn: '9780307474728'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    cover: '/books/1984.jpg',
    genre: ['Distopía', 'Ciencia ficción', 'Político'],
    rating: 4.7,
    description: 'Una novela distópica que presenta un mundo totalitario donde el Gran Hermano vigila cada movimiento de los ciudadanos.',
    year: 1949,
    pages: 328,
    isbn: '9780451524935'
  },
  {
    id: '3',
    title: 'Rayuela',
    author: 'Julio Cortázar',
    cover: '/books/rayuela.jpg',
    genre: ['Ficción', 'Experimental', 'Latinoamericano'],
    rating: 4.6,
    description: 'Una novela experimental que puede leerse de múltiples formas, explorando la vida de Horacio Oliveira en París y Buenos Aires.',
    year: 1963,
    pages: 600,
    isbn: '9788420471891'
  },
  {
    id: '4',
    title: 'El nombre de la rosa',
    author: 'Umberto Eco',
    cover: '/books/nombre-rosa.jpg',
    genre: ['Misterio', 'Historia', 'Thriller'],
    rating: 4.5,
    description: 'Un misterio medieval ambientado en un monasterio benedictino en 1327, donde una serie de muertes misteriosas sacuden la comunidad.',
    year: 1980,
    pages: 536,
    isbn: '9788426418210'
  },
  {
    id: '5',
    title: 'El nombre del viento',
    author: 'Patrick Rothfuss',
    cover: '/books/nombre-viento.jpg',
    genre: ['Fantasía', 'Épica', 'Aventura'],
    rating: 4.9,
    description: 'La historia de Kvothe, un joven que se convierte en el mago más notorio de su tiempo, narrada por él mismo.',
    year: 2007,
    pages: 662,
    isbn: '9788401352836'
  },
  {
    id: '6',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: '/books/sapiens.jpg',
    genre: ['Historia', 'Divulgación', 'Antropología'],
    rating: 4.6,
    description: 'Una exploración de la historia de la humanidad desde la Edad de Piedra hasta el siglo XXI.',
    year: 2011,
    pages: 443,
    isbn: '9780062316097'
  },
  {
    id: '7',
    title: 'Orgullo y prejuicio',
    author: 'Jane Austen',
    cover: '/books/orgullo-prejuicio.jpg',
    genre: ['Romance', 'Clásico', 'Drama'],
    rating: 4.7,
    description: 'Una novela romántica que sigue la vida de Elizabeth Bennet mientras navega por cuestiones de moralidad, educación y matrimonio.',
    year: 1813,
    pages: 432,
    isbn: '9780141439518'
  },
  {
    id: '8',
    title: 'Cosmos',
    author: 'Carl Sagan',
    cover: '/books/cosmos.jpg',
    genre: ['Ciencia', 'Divulgación', 'Astronomía'],
    rating: 4.8,
    description: 'Un viaje a través del universo, explorando el origen de la vida, la evolución y el futuro de la humanidad.',
    year: 1980,
    pages: 365,
    isbn: '9780345539434'
  },
  {
    id: '9',
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    cover: '/books/principito.jpg',
    genre: ['Infantil', 'Filosofía', 'Fábula'],
    rating: 4.9,
    description: 'Un cuento filosófico que narra las aventuras de un pequeño príncipe que viaja de planeta en planeta.',
    year: 1943,
    pages: 96,
    isbn: '9780156012195'
  },
  {
    id: '10',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    cover: '/books/quijote.jpg',
    genre: ['Clásico', 'Aventura', 'Sátira'],
    rating: 4.5,
    description: 'La obra cumbre de la literatura española que narra las aventuras de un hidalgo que pierde la razón y se cree caballero andante.',
    year: 1605,
    pages: 863,
    isbn: '9788491050612'
  }
];
