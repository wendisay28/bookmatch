import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  SwapHoriz as ExchangeIcon,
  CheckCircle as AvailableIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import {
  searchAvailableBooks,
  sendExchangeRequest,
  Book
} from '../services/matchService';

const SearchBooksPage = () => {
  const { user } = useAuth();
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

  // Cargar libros disponibles al montar
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async (search?: string) => {
    try {
      setLoading(true);
      const result = await searchAvailableBooks(search);
      setBooks(result);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      showSnackbar('Error al cargar los libros', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadBooks(searchTerm);
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header y Buscador */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: '800',
            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Buscar Libros Disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Descubre libros disponibles para intercambio en la comunidad TFT
        </Typography>

        <Box component="form" onSubmit={handleSearch}>
          <TextField
            fullWidth
            placeholder="Buscar por título, autor o código TFT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      loadBooks();
                    }}
                  >
                    Limpiar
                  </Button>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'background.paper',
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              }
            }}
          />
        </Box>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Resultados */}
      {!loading && (
        <>
          {books.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {searchTerm
                  ? 'No se encontraron libros con esa búsqueda'
                  : 'No hay libros disponibles en este momento'}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {books.length} libro{books.length !== 1 ? 's' : ''} disponible{books.length !== 1 ? 's' : ''}
              </Typography>

              <Grid container spacing={3}>
                {books.map((book) => (
                  <Grid item xs={12} sm={6} md={4} key={book.id}>
                    <Card
                      elevation={2}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="280"
                        image={book.coverUrl}
                        alt={book.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ mb: 1 }}>
                          <Chip
                            label={book.code}
                            size="small"
                            sx={{
                              fontFamily: 'monospace',
                              bgcolor: 'grey.100',
                              color: 'grey.700',
                              fontWeight: 600
                            }}
                          />
                        </Box>

                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          sx={{ fontWeight: 700, mb: 0.5 }}
                        >
                          {book.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {book.author}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                          <Chip
                            icon={<AvailableIcon sx={{ fontSize: 16 }} />}
                            label="Disponible"
                            size="small"
                            color="success"
                            sx={{ fontWeight: 600 }}
                          />
                          {book.totalExchanges > 0 && (
                            <Chip
                              icon={<ExchangeIcon sx={{ fontSize: 16 }} />}
                              label={`${book.totalExchanges} intercambios`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>

                        {book.cities.length > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {book.cities.join(', ')}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<ExchangeIcon />}
                          onClick={() => handleRequestBook(book)}
                          sx={{
                            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
                            }
                          }}
                        >
                          Solicitar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}

      {/* Dialog para solicitar libro */}
      <Dialog
        open={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Solicitar "{selectedBook?.title}"
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
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
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setRequestDialogOpen(false)} disabled={sending}>
            Cancelar
          </Button>
          <Button
            onClick={handleSendRequest}
            variant="contained"
            disabled={sending}
            startIcon={sending ? <CircularProgress size={20} /> : <ExchangeIcon />}
          >
            {sending ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SearchBooksPage;
