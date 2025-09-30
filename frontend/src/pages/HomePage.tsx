import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  IconButton
} from '@mui/material';
import {
  LocalLibrary as BookIcon,
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Mock data for books
  const trendingBooks = [
    {
      id: 1,
      title: 'Cien Años de Soledad',
      author: 'Gabriel García Márquez',
      cover: 'https://picsum.photos/seed/book1/300/450',
      rating: 4.5,
      genre: 'Realismo mágico',
    },
    {
      id: 2,
      title: 'El Principito',
      author: 'Antoine de Saint-Exupéry',
      cover: 'https://picsum.photos/seed/book2/300/450',
      rating: 4.8,
      genre: 'Fábula',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      cover: 'https://picsum.photos/seed/book3/300/450',
      rating: 4.7,
      genre: 'Ciencia ficción',
    },
  ];

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Club de Lectura: Realismo Mágico',
      date: '15 Oct 2023',
      time: '18:00 - 20:00',
      location: 'Café Literario Central',
      attendees: 12,
      cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 2,
      title: 'Intercambio de Libros',
      date: '22 Oct 2023',
      time: '16:00 - 19:00',
      location: 'Parque Central',
      attendees: 25,
      cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  // Mock data for users
  const activeUsers = [
    { id: 1, name: 'María García', avatar: '', books: 24 },
    { id: 2, name: 'Carlos López', avatar: '', books: 18 },
    { id: 3, name: 'Ana Martínez', avatar: '', books: 32 },
  ];

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarIcon key={i} color="warning" fontSize="small" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarIcon key={i} color="warning" fontSize="small" style={{ opacity: 0.5 }} />);
      } else {
        stars.push(<StarBorderIcon key={i} color="action" fontSize="small" />);
      }
    }
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        {stars}
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {rating.toFixed(1)}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: 6,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  lineHeight: 1.2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Conecta a través de la lectura
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  maxWidth: '90%',
                }}
              >
                Únete a nuestra comunidad de amantes de los libros, intercambia lecturas y descubre nuevas historias que te atraparán.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate(isAuthenticated ? '/mash' : '/register')}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: `0 4px 0 ${theme.palette.secondary.dark}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 0 ${theme.palette.secondary.dark}`,
                    },
                    '&:active': {
                      transform: 'translateY(2px)',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {isAuthenticated ? 'Hacer MASH' : 'Únete Ahora'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    fontWeight: 700,
                    borderWidth: 2,
                    textTransform: 'none',
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => navigate('/explore')}
                >
                  Explorar Libros
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
              <Box 
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100%',
                    height: '100%',
                    border: `4px solid ${theme.palette.secondary.main}`,
                    borderRadius: 4,
                    zIndex: 0,
                  },
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Personas leyendo libros"
                  style={{
                    width: '100%',
                    borderRadius: 4,
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Trending Books Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Libros Populares
            </Typography>
            <Button 
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/explore')}
              sx={{ textTransform: 'none' }}
            >
              Ver todos
            </Button>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
            {trendingBooks.map((book) => (
              <Card 
                key={book.id}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '150%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={book.cover}
                    alt={book.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <IconButton 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': { backgroundColor: 'white' },
                      }}
                    >
                      <BookmarkBorderIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': { backgroundColor: 'white' },
                      }}
                    >
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {book.author}
                  </Typography>
                  {renderRating(book.rating)}
                  <Chip 
                    label={book.genre} 
                    size="small" 
                    sx={{ mt: 1, bgcolor: theme.palette.primary.light, color: 'white' }} 
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Upcoming Events Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Próximos Eventos
            </Typography>
            <Button 
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/events')}
              sx={{ textTransform: 'none' }}
            >
              Ver todos
            </Button>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 3 }}>
            {upcomingEvents.map((event) => (
              <Card key={event.id} sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ width: '40%', position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={event.cover}
                    alt={event.title}
                    sx={{ 
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption" fontWeight={700}>
                      {event.date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {event.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {event.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                    <Box sx={{ display: 'flex', mr: 2 }}>
                      {[1, 2, 3].map((i) => (
                        <Avatar 
                          key={i}
                          sx={{ 
                            width: 28, 
                            height: 28, 
                            border: '2px solid white',
                            ml: i > 1 ? -1 : 0,
                            bgcolor: theme.palette.primary.main,
                          }}
                        >
                          <PersonIcon fontSize="small" />
                        </Avatar>
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      +{event.attendees} asistentes
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="primary" 
                      sx={{ ml: 'auto', borderRadius: 50, px: 2, py: 0.5 }}
                    >
                      Unirse
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Active Readers Section */}
        <Box>
          <Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
            Lectores Activos
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
            {activeUsers.map((user) => (
              <Card key={user.id} sx={{ p: 3, textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mx: 'auto',
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '2rem',
                  }}
                >
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  {user.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <BookIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {user.books} libros compartidos
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="primary"
                  sx={{ borderRadius: 50, px: 3, mt: 1 }}
                >
                  Seguir
                </Button>
              </Card>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            mt: 12, 
            mb: 6, 
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Únete a nuestra comunidad de lectores apasionados y descubre un mundo de historias por explorar.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(isAuthenticated ? '/mash' : '/register')}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 50,
              fontWeight: 700,
              textTransform: 'none',
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {isAuthenticated ? 'Hacer MASH ahora' : 'Regístrate Gratis'}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
