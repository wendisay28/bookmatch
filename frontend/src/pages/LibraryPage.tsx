import { useState } from 'react';
import { Box, Container, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { LibraryBookCard } from '../components/library/LibraryBookCard';

const LibraryPage = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const communityLibrary = [
    { id: 201, title: 'La sombra del viento', author: 'Carlos Ruiz Zafón', code: 'TFT-345F', currentHolder: 'Pedro L.', holderPhoto: 'https://placehold.co/50x50/333333/ffffff?text=PL' },
    { id: 202, title: 'Drácula', author: 'Bram Stoker', code: 'TFT-789G', currentHolder: 'Ana R.', holderPhoto: 'https://placehold.co/50x50/F59E0B/000000?text=AR' },
    { id: 203, title: 'Crimen y castigo', author: 'Fiódor Dostoyevski', code: 'TFT-123H', currentHolder: 'Elena M.', holderPhoto: 'https://placehold.co/50x50/10B981/ffffff?text=EM' },
    { id: 204, title: 'La casa de los espíritus', author: 'Isabel Allende', code: 'TFT-999K', currentHolder: 'Ricardo G.', holderPhoto: 'https://placehold.co/50x50/6366F1/ffffff?text=RG' },
  ];

  const handleRequest = (bookId: number) => {
    const book = communityLibrary.find(b => b.id === bookId);
    if (book) {
      setSnackbar({
        open: true,
        message: `Solicitud enviada a ${book.currentHolder} para "${book.title}"`
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Biblioteca Comunitaria
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora todos los libros en circulación de la comunidad. Puedes solicitar un libro al lector que lo tiene.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {communityLibrary.map((book) => (
          <LibraryBookCard
            key={book.id}
            book={book}
            onRequest={handleRequest}
          />
        ))}
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LibraryPage;
