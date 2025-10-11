import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogContent,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as HeartIcon,
  Replay as ReplayIcon,
  Star as StarIcon,
  Room as LocationIcon,
  Person as PersonIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface Book {
  id: number;
  title: string;
  author: string;
  owner: string;
  distance: string;
  genre: string;
  condition: string;
  avatar: string;
  image: string;
}

const MatchPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedBook, setMatchedBook] = useState<Book | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: "Cien Años de Soledad",
      author: "Gabriel García Márquez",
      owner: "María González",
      distance: "2.3 km",
      genre: "Realismo Mágico",
      condition: "Excelente",
      avatar: "🌸",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      owner: "Carlos Mendoza",
      distance: "1.5 km",
      genre: "Distopía",
      condition: "Muy bueno",
      avatar: "🎭",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop"
    },
    {
      id: 3,
      title: "El Amor en los Tiempos del Cólera",
      author: "Gabriel García Márquez",
      owner: "Ana Martínez",
      distance: "3.8 km",
      genre: "Romance",
      condition: "Excelente",
      avatar: "💕",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=1000&fit=crop"
    },
    {
      id: 4,
      title: "Rayuela",
      author: "Julio Cortázar",
      owner: "Pedro Silva",
      distance: "4.2 km",
      genre: "Experimental",
      condition: "Bueno",
      avatar: "🎨",
      image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&h=1000&fit=crop"
    },
    {
      id: 5,
      title: "La Casa de los Espíritus",
      author: "Isabel Allende",
      owner: "Laura Torres",
      distance: "2.9 km",
      genre: "Ficción Histórica",
      condition: "Muy bueno",
      avatar: "🏡",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=1000&fit=crop"
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === 'right') {
        // Simulamos un 50% de match
        if (Math.random() > 0.5) {
          setMatchedBook(books[currentIndex]);
          setShowMatch(true);
        }
      }

      // Avanzar a la siguiente carta
      if (currentIndex < books.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Reiniciar si llegamos al final
      }

      setSwipeDirection(null);
    }, 300);
  };

  const handleCloseMatch = () => {
    setShowMatch(false);
    setMatchedBook(null);
  };

  const currentBook = books[currentIndex];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px - 70px)',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header Info */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
          Encuentra tu próximo libro
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {books.length - currentIndex} libros disponibles cerca de ti
        </Typography>
      </Box>

      {/* Card Stack Container */}
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 580, md: 600 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Cards Stack (show next 2 cards behind) */}
          {books.slice(currentIndex, currentIndex + 3).map((book, index) => {
            const isActive = index === 0;
            const zIndex = 3 - index;
            const scale = 1 - index * 0.05;
            const translateY = index * 10;

            return (
              <Box
                key={book.id}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: 380,
                  height: { xs: 580, md: 600 },
                  borderRadius: 5,
                  zIndex,
                  transform: `scale(${scale}) translateY(${translateY}px) ${
                    isActive && swipeDirection === 'left' ? 'translateX(-400px) rotate(-20deg)' :
                    isActive && swipeDirection === 'right' ? 'translateX(400px) rotate(20deg)' :
                    ''
                  }`,
                  opacity: isActive && swipeDirection ? 0 : 1,
                  transition: swipeDirection ? 'all 0.3s ease-out' : 'transform 0.3s ease',
                  cursor: isActive ? 'grab' : 'default',
                  '&:active': {
                    cursor: isActive ? 'grabbing' : 'default'
                  },
                  // Glassmorphism border
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: `
                    0 8px 32px 0 rgba(46, 111, 242, 0.2),
                    0 20px 60px 0 rgba(83, 246, 130, 0.15),
                    inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)
                  `,
                  overflow: 'hidden'
                }}
              >
                {/* Book Image - Full Card */}
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    background: `url(${book.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: '17px'
                  }}
                >
                  {/* Swipe Indicator Overlays */}
                  {isActive && (
                    <>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          border: '4px solid #EF4444',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          transform: 'rotate(20deg)',
                          opacity: swipeDirection === 'left' ? 1 : 0,
                          transition: 'opacity 0.2s'
                        }}
                      >
                        <Typography variant="h6" fontWeight={900} color="#EF4444">
                          NOPE
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 20,
                          left: 20,
                          border: '4px solid #53f682',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          transform: 'rotate(-20deg)',
                          opacity: swipeDirection === 'right' ? 1 : 0,
                          transition: 'opacity 0.2s'
                        }}
                      >
                        <Typography variant="h6" fontWeight={900} color="#53f682">
                          LIKE
                        </Typography>
                      </Box>
                    </>
                  )}

                  {/* Gradient Overlay - Stronger at bottom */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Book Info - Overlaid on image */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      pb: 2.5
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Box>
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          gutterBottom
                          sx={{
                            fontSize: { xs: '1.4rem', md: '1.6rem' },
                            lineHeight: 1.2,
                            mb: 0.5,
                            color: 'white',
                            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                          }}
                        >
                          {book.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 1.5,
                            color: 'rgba(255, 255, 255, 0.95)',
                            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                            fontSize: '0.95rem'
                          }}
                        >
                          {book.author}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                        <Chip
                          label={book.genre}
                          size="small"
                          sx={{
                            background: 'rgba(46, 111, 242, 0.9)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 28,
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                          }}
                        />
                        <Chip
                          label={book.condition}
                          size="small"
                          sx={{
                            background: 'rgba(83, 246, 130, 0.9)',
                            backdropFilter: 'blur(10px)',
                            color: '#1a1a1a',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 28,
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                          }}
                        />
                      </Stack>

                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{
                          width: 38,
                          height: 38,
                          background: 'rgba(255, 255, 255, 0.95)',
                          fontSize: '1.2rem',
                          border: '2px solid rgba(255, 255, 255, 0.5)',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
                        }}>
                          {book.avatar}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{
                              fontSize: '0.95rem',
                              color: 'white',
                              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
                            }}
                          >
                            {book.owner}
                          </Typography>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <LocationIcon sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.9)' }} />
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: '0.75rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                              }}
                            >
                              {book.distance}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 3 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3, mb: 2 }}
        >
          {/* Replay Button */}
          <IconButton
            sx={{
              width: { xs: 50, md: 56 },
              height: { xs: 50, md: 56 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(245, 158, 11, 0.2)',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.2)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.15)',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
                border: '2px solid rgba(245, 158, 11, 0.4)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={() => {
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
            }}
          >
            <ReplayIcon sx={{ fontSize: { xs: 24, md: 28 }, color: '#F59E0B' }} />
          </IconButton>

          {/* Nope Button */}
          <IconButton
            sx={{
              width: { xs: 64, md: 72 },
              height: { xs: 64, md: 72 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(239, 68, 68, 0.2)',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.25)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.15)',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.35)',
                border: '2px solid rgba(239, 68, 68, 0.4)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={() => handleSwipe('left')}
          >
            <CloseIcon sx={{ fontSize: { xs: 32, md: 36 }, color: '#EF4444' }} />
          </IconButton>

          {/* Super Like Button */}
          <IconButton
            sx={{
              width: { xs: 50, md: 56 },
              height: { xs: 50, md: 56 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(46, 111, 242, 0.2)',
              boxShadow: '0 4px 16px rgba(46, 111, 242, 0.2)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.15)',
                boxShadow: '0 8px 24px rgba(46, 111, 242, 0.3)',
                border: '2px solid rgba(46, 111, 242, 0.4)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={() => handleSwipe('right')}
          >
            <StarIcon sx={{ fontSize: { xs: 24, md: 28 }, color: '#2e6ff2' }} />
          </IconButton>

          {/* Like Button */}
          <IconButton
            sx={{
              width: { xs: 64, md: 72 },
              height: { xs: 64, md: 72 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(83, 246, 130, 0.3)',
              boxShadow: '0 4px 20px rgba(83, 246, 130, 0.25)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.15)',
                boxShadow: '0 8px 32px rgba(83, 246, 130, 0.35)',
                border: '2px solid rgba(83, 246, 130, 0.5)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={() => handleSwipe('right')}
          >
            <HeartIcon sx={{ fontSize: { xs: 32, md: 36 }, color: '#53f682' }} />
          </IconButton>

          {/* Info Button */}
          <IconButton
            sx={{
              width: { xs: 50, md: 56 },
              height: { xs: 50, md: 56 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(100, 116, 139, 0.2)',
              boxShadow: '0 4px 16px rgba(100, 116, 139, 0.15)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.15)',
                boxShadow: '0 8px 24px rgba(100, 116, 139, 0.25)',
                border: '2px solid rgba(100, 116, 139, 0.3)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <InfoIcon sx={{ fontSize: { xs: 24, md: 28 }, color: '#64748B' }} />
          </IconButton>
        </Stack>
      </Container>

      {/* Match Dialog */}
      <Dialog
        open={showMatch}
        onClose={handleCloseMatch}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
            color: 'white',
            textAlign: 'center',
            p: 4
          }
        }}
      >
        <DialogContent>
          <Typography variant="h3" fontWeight={900} gutterBottom sx={{ mb: 3 }}>
            ¡Es un Match! 🎉
          </Typography>

          {matchedBook && (
            <>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: '2.5rem',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  📚
                </Avatar>
                <Typography variant="h4" fontWeight={700}>
                  ❤️
                </Typography>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: '2.5rem',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {matchedBook.avatar}
                </Avatar>
              </Stack>

              <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                A {matchedBook.owner} también le interesa intercambiar
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                "{matchedBook.title}"
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    bgcolor: 'white',
                    color: '#2e6ff2',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  Enviar Mensaje
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleCloseMatch}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 700,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Seguir Explorando
                </Button>
              </Stack>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MatchPage;
