import { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { CatalogBook, CartItem } from '../types/catalog';

// Components
import CatalogHeader from '../components/catalog/CatalogHeader';
import TFTInfoAlert from '../components/catalog/TFTInfoAlert';
import CatalogFilters from '../components/catalog/CatalogFilters';
import BookCard from '../components/catalog/BookCard';
import CartDrawer from '../components/catalog/CartDrawer';
import TFTInfoDialog from '../components/catalog/TFTInfoDialog';

// Mock data
import { mockCatalogBooks, genres } from '../data/mockCatalog';

const CatalogPage = () => {
  const { user } = useAuth();
  const [books] = useState<CatalogBook[]>(mockCatalogBooks);
  const [filteredBooks, setFilteredBooks] = useState<CatalogBook[]>(mockCatalogBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [sortBy, setSortBy] = useState('title');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [tftInfoOpen, setTftInfoOpen] = useState(false);

  // Filter and sort books
  useEffect(() => {
    let result = [...books];

    // Filter by search
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
      );
    }

    // Filter by genre
    if (selectedGenre !== 'Todos') {
      result = result.filter(book => book.genre === selectedGenre);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

    setFilteredBooks(result);
  }, [books, searchTerm, selectedGenre, sortBy]);

  const addToCart = (book: CatalogBook) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.book.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, book.stock) }
            : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => prevCart.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.book.id === bookId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return item;
          if (newQuantity > item.book.stock) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <CatalogHeader
          cartItemsCount={getTotalItems()}
          onCartClick={() => setCartOpen(true)}
        />

        {/* Info TFT */}
        <TFTInfoAlert onMoreInfo={() => setTftInfoOpen(true)} />

        {/* Search and Filters */}
        <CatalogFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
          genres={genres}
        />
      </Box>

      {/* Results Count */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''} disponible{filteredBooks.length !== 1 ? 's' : ''}
      </Typography>

      {/* Books Grid */}
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard
              book={book}
              onAddToCart={addToCart}
              formatPrice={formatPrice}
            />
          </Grid>
        ))}
      </Grid>

      {filteredBooks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron libros con los filtros seleccionados
          </Typography>
        </Box>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
        formatPrice={formatPrice}
      />

      {/* TFT Info Dialog */}
      <TFTInfoDialog
        open={tftInfoOpen}
        onClose={() => setTftInfoOpen(false)}
      />
    </Container>
  );
};

export default CatalogPage;
