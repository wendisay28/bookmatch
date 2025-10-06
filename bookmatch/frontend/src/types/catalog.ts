export interface CatalogBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  price: number;
  coverUrl: string;
  description: string;
  publisher: string;
  publishYear: number;
  pages: number;
  language: string;
  stock: number;
}

export interface CartItem {
  book: CatalogBook;
  quantity: number;
}
