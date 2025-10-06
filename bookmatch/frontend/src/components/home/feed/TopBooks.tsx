import React from 'react';
import { Box, Typography, IconButton, Card, CardContent, Chip, Avatar } from '@mui/material';
import { ChevronLeft, ChevronRight, SwapHoriz, Star } from '@mui/icons-material';

interface TopBook {
  id: number;
  title: string;
  author: string;
  exchanges: number;
  rating: number;
  cover: string;
  currentHolder: string;
  holderAvatar: string;
  category: string;
}

interface TopBooksProps {
  books: TopBook[];
  onBookClick?: (book: TopBook) => void;
}

const TopBooks: React.FC<TopBooksProps> = ({ books, onBookClick }) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      const newScrollPosition = scrollPosition + scrollOffset;
      scrollContainerRef.current.scrollLeft = newScrollPosition;
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Top Libros Más Intercambiados</Typography>
          <Typography variant="caption" color="text.secondary">Los favoritos de la comunidad</Typography>
        </Box>
        <Box>
          <IconButton
            size="small"
            onClick={() => scroll(-300)}
            sx={{ mr: 1, bgcolor: 'rgba(0,0,0,0.04)' }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => scroll(300)}
            sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          pb: 2,
          mx: -2,
          px: 2,
        }}
      >
        {books.map((book: TopBook, index: number) => (
          <Card
            key={book.id}
            sx={{
              flex: '0 0 auto',
              width: 220,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              },
            }}
            onClick={() => onBookClick?.(book)}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={book.cover}
                alt={book.title}
                sx={{
                  width: '100%',
                  height: 140,
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'warning.main',
                  color: 'white',
                  borderRadius: '8px',
                  px: 1,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                <SwapHoriz sx={{ fontSize: '0.9rem' }} />
                {book.exchanges}
              </Box>
              {index < 3 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                    color: 'white',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  #{index + 1}
                </Box>
              )}
            </Box>
            <CardContent sx={{ pb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.5em',
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {book.author}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <Star sx={{ fontSize: '0.9rem', color: 'warning.main' }} />
                <Typography variant="caption" fontWeight={600}>{book.rating}</Typography>
              </Box>
              <Chip
                label={book.category}
                size="small"
                sx={{
                  fontSize: '0.65rem',
                  height: 20,
                  mb: 1,
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, pt: 1, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <Avatar
                  src={book.holderAvatar}
                  sx={{ width: 20, height: 20 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  Con {book.currentHolder}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopBooks;
