import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { SwapHoriz as SwapIcon } from '@mui/icons-material';

const topBooks = [
  {
    id: 1,
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
    exchanges: 156,
  },
  {
    id: 2,
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80',
    exchanges: 142,
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80',
    exchanges: 138,
  },
  {
    id: 4,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
    exchanges: 124,
  },
];

const TopBooksSection: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Top de Libros Más Intercambiados
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        {topBooks.map((book) => (
          <Card
            key={book.id}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)' },
            }}
          >
            <CardMedia
              component="img"
              height="280"
              image={book.cover}
              alt={book.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="body1" fontWeight={700} noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {book.author}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <SwapIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" fontWeight={600}>
                  {book.exchanges} intercambios
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopBooksSection;
