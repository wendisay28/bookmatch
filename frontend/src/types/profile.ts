export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  code?: string;
  progress?: number;
  exchanges?: number;
  cities?: string[];
  avgTime?: number;
  current?: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string;
  rarity: 'legendary' | 'epic' | 'rare' | 'uncommon';
}

export interface Exchange {
  id: number;
  title: string;
  type: string;
  date: string;
  status: 'Completado' | 'En Proceso' | 'Pendiente';
}

export interface UserData {
  userId: string;
  name: string;
  memberSince: string;
  photoUrl: string;
  coverUrl: string;
  quote: string;
  readerLevel: number;
  levelProgressPercent: number;
  nextLevelAt: number;
  booksLinked: number;
  avgTimeKeptDays: number;
  maxBooksRequestedRecord: number;
  totalExchanges: number;
  eventsAttended: number;
  challengesCompleted: number;
  collectibles: number;
  currentBook: Book;
  definingBooks: Omit<Book, 'code' | 'progress' | 'exchanges' | 'cities' | 'avgTime' | 'current'>[];
}
