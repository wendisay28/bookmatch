import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Box,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  AccessTime as TimeIcon,
  ViewModule as GridViewIcon,
  CalendarViewMonth as CalendarViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data para eventos
const mockEvents = [
  {
    id: 1,
    title: 'Club de Lectura: Realismo Mágico',
    description: 'Únete a nosotros para explorar las obras maestras del realismo mágico latinoamericano.',
    date: '2024-10-15',
    time: '18:00',
    location: 'Café Literario Central',
    attendees: 24,
    maxAttendees: 30,
    category: 'Club de Lectura',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    host: {
      name: 'María García',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
  },
  {
    id: 2,
    title: 'Taller de Escritura Creativa',
    description: 'Aprende técnicas de narrativa y desarrolla tu voz como escritor en este taller interactivo.',
    date: '2024-10-18',
    time: '16:00',
    location: 'Biblioteca Municipal',
    attendees: 15,
    maxAttendees: 20,
    category: 'Taller',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    host: {
      name: 'Carlos Ruiz',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  },
  {
    id: 3,
    title: 'Intercambio de Libros',
    description: 'Trae tus libros favoritos y descubre nuevas lecturas en nuestro intercambio mensual.',
    date: '2024-10-22',
    time: '11:00',
    location: 'Parque Central',
    attendees: 42,
    maxAttendees: 50,
    category: 'Intercambio',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
    host: {
      name: 'Ana Martínez',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    id: 4,
    title: 'Presentación: Nuevos Autores',
    description: 'Conoce a los autores emergentes y sus últimas obras en una tarde llena de inspiración.',
    date: '2024-10-25',
    time: '19:30',
    location: 'Auditorio Cultural',
    attendees: 38,
    maxAttendees: 100,
    category: 'Presentación',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    host: {
      name: 'Luis Fernández',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
  },
  {
    id: 5,
    title: 'Noche de Poesía',
    description: 'Una velada especial donde poetas locales comparten sus versos más profundos.',
    date: '2024-10-28',
    time: '20:00',
    location: 'Teatro Pequeño',
    attendees: 28,
    maxAttendees: 40,
    category: 'Poesía',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    host: {
      name: 'Sofia León',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
  },
  {
    id: 6,
    title: 'Maratón de Lectura',
    description: 'Un día completo dedicado a la lectura continua de obras clásicas y contemporáneas.',
    date: '2024-11-02',
    time: '10:00',
    location: 'Plaza de la Literatura',
    attendees: 56,
    maxAttendees: 80,
    category: 'Maratón',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    host: {
      name: 'Pedro Sánchez',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
  },
];

const categories = ['Todos', 'Club de Lectura', 'Taller', 'Intercambio', 'Presentación', 'Poesía', 'Maratón'];

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const getAttendancePercentage = (attendees: number, maxAttendees: number) => {
    return (attendees / maxAttendees) * 100;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F7F9FC 0%, #E8F0FE 100%)',
        pt: { xs: 10, sm: 12 },
        pb: { xs: 10, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 6, textAlign: 'center' }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Eventos Literarios
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Conecta con otros amantes de la lectura y participa en experiencias únicas
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            mb: 4,
            p: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          <Stack spacing={3}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Buscar eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  '& fieldset': { border: 'none' },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                },
              }}
            />

            {/* Categories and View Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      ...(selectedCategory === category
                        ? {
                            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                          }
                        : {
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              transform: 'translateY(-2px)',
                            },
                          }),
                    }}
                  />
                ))}
              </Stack>

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="grid">
                  <GridViewIcon sx={{ mr: 1 }} />
                  Cuadrícula
                </ToggleButton>
                <ToggleButton value="calendar">
                  <CalendarViewIcon sx={{ mr: 1 }} />
                  Calendario
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </Box>

        {/* Events Grid */}
        {viewMode === 'grid' && (
          <Grid container spacing={3}>
            {filteredEvents.map((event, index) => (
              <Grid item xs={12} sm={6} lg={4} key={event.id}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={event.image}
                      alt={event.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                      }}
                    >
                      <Chip
                        label={event.category}
                        sx={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(12px)',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => toggleFavorite(event.id)}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(12px)',
                          '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {favorites.includes(event.id) ? (
                          <FavoriteIcon sx={{ color: '#3B82F6' }} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                      <IconButton
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(12px)',
                          '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                          })}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimeIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.time} hrs
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon sx={{ fontSize: 18, color: 'error.main' }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {event.location}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GroupIcon sx={{ fontSize: 18, color: 'success.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.attendees}/{event.maxAttendees} asistentes
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Progress Bar */}
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          width: '100%',
                          height: 6,
                          backgroundColor: 'rgba(0,0,0,0.08)',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${getAttendancePercentage(event.attendees, event.maxAttendees)}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Host Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1.5 }}>
                      <Avatar
                        src={event.host.avatar}
                        alt={event.host.name}
                        sx={{
                          width: 32,
                          height: 32,
                          border: '2px solid white',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Organizado por
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {event.host.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                          boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Unirme al Evento
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Calendar View Placeholder */}
        {viewMode === 'calendar' && (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <CalendarViewIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Vista de Calendario
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Próximamente: Visualiza todos los eventos en un calendario interactivo
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EventsPage;
