import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const MashPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          BookMatch MASH
        </Typography>
        <Typography variant="body1" paragraph>
          Encuentra tu libro perfecto con nuestro sistema de recomendación.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Comenzar MASH
        </Button>
      </Box>
    </Container>
  );
};

export default MashPage;
