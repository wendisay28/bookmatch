import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ExplorePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Explorar Libros
        </Typography>
        <Typography variant="body1">
          Descubre nuevos libros y encuentra tu próxima lectura favorita.
        </Typography>
      </Box>
    </Container>
  );
};

export default ExplorePage;
