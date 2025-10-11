import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
  Grid,
  useTheme,
  useMediaQuery,
  Fab,
  Badge,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  SwapHoriz as ExchangeIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalMall as LocalMallIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { sendExchangeRequest, Book } from '../services/matchService';
import { LibraryBookCard } from '../components/library/LibraryBookCard';
import { CatalogBook, CartItem } from '../types/catalog';

// Catalog Components
import TFTInfoAlert from '../components/catalog/TFTInfoAlert';
import BookCard from '../components/catalog/BookCard';
import CartDrawer from '../components/catalog/CartDrawer';
import TFTInfoDialog from '../components/catalog/TFTInfoDialog';

// Mock data
import { mockCatalogBooks, genres } from '../data/mockCatalog';

// Design System
const SPACING = {
  xs: 1,   // 8px
  sm: 2,   // 16px
  md: 3,   // 24px
  lg: 4,   // 32px
  xl: 6,   // 48px
};

const ELEVATION = {
  flat: {
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'divider'
  },
  low: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    border: 'none'
  },
  medium: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: 'none'
  },
  high: {
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    border: 'none'
  }
};

const BORDER_RADIUS = {
  sm: 2,   // 8px
  md: 3,   // 12px
  lg: 4,   // 16px
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ExplorePage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentTab, setCurrentTab] = useState(0);

  // Unified view mode for both tabs
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Library states
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'info' });

  // Catalog states
  const [catalogBooks] = useState<CatalogBook[]>(mockCatalogBooks);
  const [filteredCatalogBooks, setFilteredCatalogBooks] = useState<CatalogBook[]>(mockCatalogBooks);
  const [catalogSearchTerm, setCatalogSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [sortBy, setSortBy] = useState('title');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [tftInfoOpen, setTftInfoOpen] = useState(false);

  // Mock library books
  const mockBooks: Book[] = [
    {
      id: '1',
      code: 'TFT-345F',
      title: 'La sombra del viento',
      author: 'Carlos Ruiz Zafón',
      isbn: '',
      coverUrl: 'https://placehold.co/400x600/14B8A6/ffffff?text=Sombra',
      contributedBy: 'user1',
      currentHolder: 'user2',
      isAvailable: true,
      availableDate: null,
      totalExchanges: 3,
      cities: ['Barcelona', 'Madrid'],
      avgReadingTime: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      code: 'TFT-789G',
      title: 'Drácula',
      author: 'Bram Stoker',
      isbn: '',
      coverUrl: 'https://placehold.co/400x600/DC2626/ffffff?text=Dracula',
      contributedBy: 'user2',
      currentHolder: 'user3',
      isAvailable: true,
      availableDate: null,
      totalExchanges: 7,
      cities: ['Londres', 'Bogotá'],
      avgReadingTime: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      code: 'TFT-123H',
      title: 'Crimen y castigo',
      author: 'Fiódor Dostoyevski',
      isbn: '',
      coverUrl: 'https://placehold.co/400x600/8B5CF6/ffffff?text=Crimen',
      contributedBy: 'user3',
      currentHolder: 'user4',
      isAvailable: true,
      availableDate: null,
      totalExchanges: 5,
      cities: ['Moscú', 'Ciudad de México'],
      avgReadingTime: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      code: 'TFT-999K',
      title: 'La casa de los espíritus',
      author: 'Isabel Allende',
      isbn: '',
      coverUrl: 'https://placehold.co/400x600/059669/ffffff?text=Casa',
      contributedBy: 'user4',
      currentHolder: 'user5',
      isAvailable: true,
      availableDate: null,
      totalExchanges: 4,
      cities: ['Santiago', 'Lima'],
      avgReadingTime: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      code: 'TFT-456J',
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      isbn: '',
      coverUrl: 'https://placehold.co/400x600/F59E0B/000000?text=Cien',
      contributedBy: 'user5',
      currentHolder: 'user6',
      isAvailable: true,
      availableDate: null,
      totalExchanges: 12,
      cities: ['Bogotá', 'Medellín', 'Cartagena'],
      avgReadingTime: 14,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      code: 'TFT-222M',
      title: '1984',
      author: 'George Orwell',
      isbn: '',
      coverUrl: 'https://placehold.co/400x600/374151/ffffff?text=1984',
      contributedBy: 'user6',
      currentHolder: 'user7',
      isAvailable: true,
      availableDate: null,
      totalExchanges: 8,
      cities: ['Londres', 'París'],
      avgReadingTime: 9,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Load library books
  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter catalog books
  useEffect(() => {
    let result = [...catalogBooks];

    if (catalogSearchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(catalogSearchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(catalogSearchTerm.toLowerCase()) ||
        book.isbn.includes(catalogSearchTerm)
      );
    }

    if (selectedGenre !== 'Todos') {
      result = result.filter(book => book.genre === selectedGenre);
    }

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

    setFilteredCatalogBooks(result);
  }, [catalogBooks, catalogSearchTerm, selectedGenre, sortBy]);

  const loadBooks = async (search?: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      let result = mockBooks;

      if (search) {
        const term = search.toLowerCase();
        result = mockBooks.filter(book =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.code.toLowerCase().includes(term)
        );
      }

      setBooks(result);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      showSnackbar('Error al cargar los libros', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    if (currentTab === 0) {
      setSearchTerm(value);
      loadBooks(value);
    } else {
      setCatalogSearchTerm(value);
    }
  };

  const handleRequestBook = (book: Book) => {
    if (!user) {
      showSnackbar('Debes iniciar sesión para solicitar libros', 'error');
      return;
    }

    if (book.currentHolder === user.id) {
      showSnackbar('Este es tu propio libro', 'info');
      return;
    }

    setSelectedBook(book);
    setRequestDialogOpen(true);
  };

  const handleSendRequest = async () => {
    if (!selectedBook || !user) return;

    try {
      setSending(true);
      await sendExchangeRequest(selectedBook.id, user.id, requestMessage);
      showSnackbar('¡Solicitud enviada exitosamente!', 'success');
      setRequestDialogOpen(false);
      setRequestMessage('');
      setSelectedBook(null);
    } catch (error: any) {
      console.error('Error al enviar solicitud:', error);
      showSnackbar(error.message || 'Error al enviar la solicitud', 'error');
    } finally {
      setSending(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Catalog functions
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
    showSnackbar(`${book.title} agregado al carrito`, 'success');
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

  const getCurrentPlaceholder = () =>
    currentTab === 0
      ? 'Buscar por título, autor o código TFT...'
      : 'Buscar por título, autor o ISBN...';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        pb: { xs: 10, md: 4 }
      }}
    >
      <Container maxWidth="xl" sx={{ py: SPACING.lg }}>
        {/* Hero Section */}
        <Box sx={{ mb: SPACING.lg }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: SPACING.xs,
              color: 'text.primary'
            }}
          >
            Explorar
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: SPACING.md, fontSize: '1rem' }}
          >
            Descubre libros para intercambiar o comprar
          </Typography>

          {/* Tabs */}
          <Tabs
            value={currentTab}
            onChange={(_, newValue) => setCurrentTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 48,
                px: SPACING.md
              }
            }}
          >
            <Tab
              icon={<ExchangeIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Intercambiar"
            />
            <Tab
              icon={<LocalMallIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Comprar"
            />
          </Tabs>
        </Box>

        {/* Tab Panel 1: Biblioteca Comunitaria */}
        <TabPanel value={currentTab} index={0}>
          {/* Search & Controls - Responsive */}
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: BORDER_RADIUS.md,
              p: SPACING.sm,
              mb: SPACING.md,
              ...ELEVATION.low
            }}
          >
            {/* Search - Full width */}
            <TextField
              fullWidth
              placeholder={getCurrentPlaceholder()}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => handleSearch('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: SPACING.sm,
                '& .MuiOutlinedInput-root': {
                  borderRadius: BORDER_RADIUS.md,
                }
              }}
            />

            {/* View Toggle - Full width en mobile */}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              fullWidth
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: BORDER_RADIUS.md,
                }
              }}
            >
              <ToggleButton value="grid" aria-label="vista cuadrícula">
                <GridViewIcon />
                <Box component="span" sx={{ ml: 1, display: { xs: 'inline', sm: 'none', md: 'inline' } }}>
                  Cuadrícula
                </Box>
              </ToggleButton>
              <ToggleButton value="list" aria-label="vista lista">
                <ListViewIcon />
                <Box component="span" sx={{ ml: 1, display: { xs: 'inline', sm: 'none', md: 'inline' } }}>
                  Lista
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Results Counter */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: SPACING.md,
              p: SPACING.sm,
              bgcolor: 'white',
              borderRadius: BORDER_RADIUS.md,
              ...ELEVATION.low
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {books.length} libro{books.length !== 1 ? 's' : ''} disponible{books.length !== 1 ? 's' : ''}
            </Typography>
            <Chip
              label="Gratis"
              color="success"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && books.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                bgcolor: 'white',
                borderRadius: BORDER_RADIUS.md,
                ...ELEVATION.low
              }}
            >
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                {searchTerm
                  ? 'No se encontraron libros con esa búsqueda'
                  : 'No hay libros disponibles en este momento'}
              </Typography>
            </Box>
          )}

          {!loading && books.length > 0 && (
            <>
              {viewMode === 'list' && (
                <Stack spacing={SPACING.sm}>
                  {books.map((book) => (
                    <LibraryBookCard
                      key={book.id}
                      book={book}
                      onRequest={handleRequestBook}
                    />
                  ))}
                </Stack>
              )}

              {viewMode === 'grid' && (
                <Grid container spacing={SPACING.md}>
                  {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                      <Box
                        sx={{
                          bgcolor: 'white',
                          borderRadius: BORDER_RADIUS.md,
                          overflow: 'hidden',
                          ...ELEVATION.low,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            ...ELEVATION.medium,
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={book.coverUrl}
                          alt={book.title}
                          sx={{
                            width: '100%',
                            height: 280,
                            objectFit: 'cover',
                            bgcolor: 'grey.100'
                          }}
                        />
                        <Box sx={{ p: SPACING.sm }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontFamily: 'monospace',
                              color: 'text.secondary',
                              mb: SPACING.xs,
                              fontSize: '0.75rem'
                            }}
                          >
                            {book.code}
                          </Typography>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5, fontSize: '1rem' }}>
                            {book.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: SPACING.sm }}>
                            {book.author}
                          </Typography>
                          <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            startIcon={<ExchangeIcon />}
                            onClick={() => handleRequestBook(book)}
                            sx={{
                              background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
                              fontWeight: 600,
                              textTransform: 'none',
                              borderRadius: BORDER_RADIUS.sm,
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
                              }
                            }}
                          >
                            Solicitar
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </TabPanel>

        {/* Tab Panel 2: Catálogo de Compra */}
        <TabPanel value={currentTab} index={1}>
          {/* Filters Bar - Responsive */}
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: BORDER_RADIUS.md,
              p: SPACING.sm,
              mb: SPACING.md,
              ...ELEVATION.low
            }}
          >
            {/* Search - Full width en mobile y desktop */}
            <TextField
              fullWidth
              placeholder={getCurrentPlaceholder()}
              value={catalogSearchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: catalogSearchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => handleSearch('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: SPACING.sm,
                '& .MuiOutlinedInput-root': {
                  borderRadius: BORDER_RADIUS.md,
                }
              }}
            />

            {/* Filters Row - 2 columnas en mobile, fila en desktop */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'auto auto auto' },
                gap: SPACING.sm,
                alignItems: 'center'
              }}
            >
              {/* Genre Filter */}
              <FormControl fullWidth>
                <InputLabel>Género</InputLabel>
                <Select
                  value={selectedGenre}
                  label="Género"
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  sx={{ borderRadius: BORDER_RADIUS.md }}
                >
                  {genres.map(genre => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sort */}
              <FormControl fullWidth>
                <InputLabel>Ordenar</InputLabel>
                <Select
                  value={sortBy}
                  label="Ordenar"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: BORDER_RADIUS.md }}
                >
                  <MenuItem value="title">Título</MenuItem>
                  <MenuItem value="author">Autor</MenuItem>
                  <MenuItem value="price-asc">$ Menor</MenuItem>
                  <MenuItem value="price-desc">$ Mayor</MenuItem>
                </Select>
              </FormControl>

              {/* View Toggle - Full width en mobile */}
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                fullWidth
                onChange={(_, newMode) => newMode && setViewMode(newMode)}
                sx={{
                  gridColumn: { xs: '1 / -1', md: 'auto' },
                  '& .MuiToggleButton-root': {
                    borderRadius: BORDER_RADIUS.md,
                  }
                }}
              >
                <ToggleButton value="grid" aria-label="vista cuadrícula">
                  <GridViewIcon />
                  <Box component="span" sx={{ ml: 1, display: { xs: 'inline', sm: 'none', md: 'inline' } }}>
                    Cuadrícula
                  </Box>
                </ToggleButton>
                <ToggleButton value="list" aria-label="vista lista">
                  <ListViewIcon />
                  <Box component="span" sx={{ ml: 1, display: { xs: 'inline', sm: 'none', md: 'inline' } }}>
                    Lista
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* TFT Info Alert */}
            <Box sx={{ mt: SPACING.sm }}>
              <TFTInfoAlert onMoreInfo={() => setTftInfoOpen(true)} />
            </Box>
          </Box>

          {/* Results Counter */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: SPACING.md,
              p: SPACING.sm,
              bgcolor: 'white',
              borderRadius: BORDER_RADIUS.md,
              ...ELEVATION.low
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {filteredCatalogBooks.length} {filteredCatalogBooks.length === 1 ? 'libro' : 'libros'}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              {selectedGenre !== 'Todos' ? selectedGenre : 'Todos los géneros'}
            </Typography>
          </Box>

          {/* Grid de libros */}
          {filteredCatalogBooks.length > 0 ? (
            <Grid container spacing={SPACING.md}>
              {filteredCatalogBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                  <BookCard book={book} onAddToCart={addToCart} formatPrice={formatPrice} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40vh',
                textAlign: 'center',
                p: SPACING.lg,
                bgcolor: 'white',
                borderRadius: BORDER_RADIUS.md,
                ...ELEVATION.low
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: SPACING.xs, fontWeight: 600 }}>
                No se encontraron libros
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Intenta con otros filtros
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Container>

      {/* Floating Cart Button - Mobile - FIXED POSITION */}
      {isMobile && currentTab === 1 && getTotalItems() > 0 && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 88, // 64px BottomNav + 24px gap
            right: 16,
            zIndex: 1000,
            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
            ...ELEVATION.high,
            '&:hover': {
              background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease'
          }}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={getTotalItems()} color="error" max={99}>
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      )}

      {/* Desktop Cart Button */}
      {!isMobile && currentTab === 1 && (
        <Box
          sx={{
            position: 'fixed',
            bottom: SPACING.md,
            right: SPACING.md,
            zIndex: 1000
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={() => setCartOpen(true)}
            sx={{
              bgcolor: 'primary.main',
              borderRadius: BORDER_RADIUS.md,
              px: SPACING.md,
              py: 1.5,
              fontWeight: 600,
              ...ELEVATION.medium,
              '&:hover': {
                bgcolor: 'primary.dark',
                ...ELEVATION.high
              }
            }}
          >
            Carrito ({getTotalItems()})
          </Button>
        </Box>
      )}

      {/* Dialog para solicitar libro */}
      <Dialog
        open={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: BORDER_RADIUS.lg,
            ...ELEVATION.high
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Solicitar "{selectedBook?.title}"
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: SPACING.sm }}>
            Enviarás una solicitud de intercambio al lector actual. Puedes incluir un mensaje personalizado.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            label="Mensaje (opcional)"
            placeholder="Ej: Hola, me gustaría leer este libro. ¿Podríamos coordinar el intercambio?"
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: BORDER_RADIUS.md
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: SPACING.md }}>
          <Button onClick={() => setRequestDialogOpen(false)} disabled={sending}>
            Cancelar
          </Button>
          <Button
            onClick={handleSendRequest}
            variant="contained"
            disabled={sending}
            startIcon={sending ? <CircularProgress size={20} /> : <ExchangeIcon />}
            sx={{
              background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
              }
            }}
          >
            {sending ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </DialogActions>
      </Dialog>

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
      <TFTInfoDialog open={tftInfoOpen} onClose={() => setTftInfoOpen(false)} />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: BORDER_RADIUS.md,
            ...ELEVATION.high
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExplorePage;
