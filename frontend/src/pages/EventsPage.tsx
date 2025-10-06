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
  Stack,
  Avatar,
  Divider,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  AccessTime as TimeIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  TrendingUp as TrendingIcon,
  Upcoming as UpcomingIcon,
  EventAvailable as MyEventsIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, orderBy, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { supabase } from '../config/supabase';

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
    isPremium: false,
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
    isPremium: true,
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
    isPremium: false,
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
    isPremium: false,
  },
  {
    id: 5,
    title: 'Noche de Poesía Premium',
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
    isPremium: true,
  },
];

const categories = ['Todos', 'Club de Lectura', 'Taller', 'Intercambio', 'Presentación', 'Poesía'];

const EventsPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentTab, setCurrentTab] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    maxAttendees: '',
    isPremium: false,
  });

  // Cargar eventos desde Firestore
  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsQuery = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(eventsQuery);
        const loadedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents([...mockEvents, ...loadedEvents]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents(mockEvents);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (eventId: string | number) => {
    setFavorites(prev =>
      prev.includes(eventId as number) ? prev.filter(id => id !== eventId) : [...prev, eventId as number]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = async () => {
    if (!user) {
      alert('Debes iniciar sesión para crear un evento');
      return;
    }

    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.category) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setCreating(true);

    try {
      let imageUrl = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80';

      // Subir imagen a Supabase Storage si existe
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          console.log('Uploading image to Supabase...', filePath);
          console.log('File size:', (imageFile.size / 1024 / 1024).toFixed(2), 'MB');

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('events')
            .upload(filePath, imageFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Error uploading image to Supabase:', uploadError);
            console.error('Error details:', JSON.stringify(uploadError, null, 2));
            // No lanzar error, solo usar imagen por defecto
            console.warn('⚠️ Using default image instead. Please create the "events" bucket in Supabase Storage.');
          } else {
            // Obtener URL pública de la imagen
            const { data: { publicUrl } } = supabase.storage
              .from('events')
              .getPublicUrl(filePath);

            imageUrl = publicUrl;
            console.log('✅ Image uploaded successfully:', imageUrl);
          }
        } catch (imgError) {
          console.error('❌ Image upload failed:', imgError);
          console.warn('⚠️ Continuing with default image');
          // Continuar con imagen por defecto
        }
      }

      // Crear evento en Firestore
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        category: newEvent.category,
        maxAttendees: parseInt(newEvent.maxAttendees) || 50,
        attendees: 0,
        isPremium: newEvent.isPremium,
        image: imageUrl,
        host: {
          name: user.name,
          avatar: user.avatar || 'https://i.pravatar.cc/150?img=1',
          userId: user.id,
        },
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'events'), eventData);

      // Agregar el evento a la lista local
      setEvents(prev => [{
        id: docRef.id,
        ...eventData,
      }, ...prev]);

      // Limpiar formulario
      setOpenCreateDialog(false);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
        maxAttendees: '',
        isPremium: false,
      });
      setImageFile(null);
      setImagePreview('');

      alert('¡Evento creado exitosamente!');
    } catch (error: any) {
      console.error('Error creating event:', error);
      const errorMessage = error?.message || error?.toString() || 'Error desconocido';
      alert(`Error al crear el evento: ${errorMessage}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteEvent = async (eventId: string, eventImage: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      return;
    }

    try {
      // Eliminar de Firestore
      await deleteDoc(doc(db, 'events', eventId));

      // Eliminar imagen de Supabase si no es una imagen por defecto
      if (eventImage && !eventImage.includes('unsplash.com')) {
        try {
          const imagePath = eventImage.split('/').pop();
          if (imagePath) {
            await supabase.storage.from('events').remove([imagePath]);
          }
        } catch (imgError) {
          console.error('Error deleting image:', imgError);
          // Continuar aunque falle la eliminación de la imagen
        }
      }

      // Eliminar de la lista local
      setEvents(prev => prev.filter(event => event.id !== eventId));

      alert('Evento eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error al eliminar el evento. Por favor intenta de nuevo.');
    }
  };

  const getAttendancePercentage = (attendees: number, maxAttendees: number) => {
    return (attendees / maxAttendees) * 100;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FAFAFA',
        pt: '72px',
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header with Tabs */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#1A1A1A',
              }}
            >
              Eventos
            </Typography>
          </Box>

          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{
              mb: 1,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 48,
                color: '#6B7280',
                '&.Mui-selected': {
                  color: '#2e6ff2',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#2e6ff2',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab icon={<TrendingIcon />} iconPosition="start" label="Destacados" />
            <Tab icon={<UpcomingIcon />} iconPosition="start" label="Próximos" />
            <Tab icon={<MyEventsIcon />} iconPosition="start" label="Mis Eventos" />
          </Tabs>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Buscar eventos por nombre, ubicación o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#9CA3AF' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                '& fieldset': { border: 'none' },
                '&:hover': {
                  borderColor: '#2e6ff2',
                },
                '&.Mui-focused': {
                  borderColor: '#2e6ff2',
                  boxShadow: '0 0 0 3px rgba(46, 111, 242, 0.1)',
                },
              },
            }}
          />

          {/* Categories */}
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.2s ease',
                  ...(selectedCategory === category
                    ? {
                        backgroundColor: '#2e6ff2',
                        color: 'white',
                        borderColor: '#2e6ff2',
                      }
                    : {
                        backgroundColor: 'white',
                        color: '#6B7280',
                        '&:hover': {
                          backgroundColor: '#F3F4F6',
                          borderColor: '#2e6ff2',
                        },
                      }),
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={3}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: '#2e6ff2',
                  },
                }}
              >
                {/* Image */}
                <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
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
                    }}
                  />

                  {event.isPremium && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                      }}
                    >
                      <Chip
                        label="Premium"
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #53f682 0%, #2ecc71 100%)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                        }}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => toggleFavorite(event.id)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      {favorites.includes(event.id) ? (
                        <FavoriteIcon sx={{ fontSize: 18, color: '#EF4444' }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <ShareIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Chip
                    label={event.category}
                    size="small"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      backgroundColor: '#F3F4F6',
                      color: '#6B7280',
                      height: 24,
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.1rem',
                      color: '#1A1A1A',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.3,
                    }}
                  >
                    {event.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: '#6B7280',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                    }}
                  >
                    {event.description}
                  </Typography>

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: '#6B7280' }} />
                      <Typography variant="body2" sx={{ color: '#1A1A1A', fontWeight: 500 }}>
                        {new Date(event.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6B7280', ml: 'auto' }}>
                        {event.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ fontSize: 16, color: '#6B7280' }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6B7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {event.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GroupIcon sx={{ fontSize: 16, color: '#6B7280' }} />
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        {event.attendees || 0} / {event.maxAttendees} asistentes
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  {/* Host Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        src={event.host.avatar}
                        alt={event.host.name}
                        sx={{
                          width: 28,
                          height: 28,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                        {event.host.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Buttons */}
                  {user && event.host?.userId === user.id ? (
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          py: 1.2,
                          borderRadius: 2,
                          fontWeight: 600,
                          textTransform: 'none',
                          backgroundColor: '#2e6ff2',
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#1e5fd9',
                            boxShadow: 'none',
                          },
                        }}
                      >
                        Ver detalles
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteEvent(event.id, event.image)}
                        sx={{
                          py: 1.2,
                          px: 2,
                          borderRadius: 2,
                          fontWeight: 600,
                          textTransform: 'none',
                          borderColor: '#EF4444',
                          color: '#EF4444',
                          minWidth: 'auto',
                          '&:hover': {
                            backgroundColor: '#FEE2E2',
                            borderColor: '#DC2626',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        py: 1.2,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        backgroundColor: '#2e6ff2',
                        boxShadow: 'none',
                        '&:hover': {
                          backgroundColor: '#1e5fd9',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      Ver detalles
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="crear evento"
          onClick={() => setOpenCreateDialog(true)}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
            boxShadow: '0 8px 24px rgba(46, 111, 242, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e5fd9 0%, #2ecc71 100%)',
              boxShadow: '0 12px 32px rgba(46, 111, 242, 0.5)',
            },
          }}
        >
          <AddIcon />
        </Fab>

        {/* Create Event Dialog */}
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" fontWeight={700}>
                Crear Evento
              </Typography>
              <IconButton onClick={() => setOpenCreateDialog(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={2.5}>
              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="event-image-upload"
              />
              <label htmlFor="event-image-upload">
                <Box
                  sx={{
                    width: '100%',
                    height: 160,
                    borderRadius: 2,
                    border: '2px dashed #E5E7EB',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F9FAFB',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    '&:hover': {
                      borderColor: '#2e6ff2',
                      backgroundColor: '#F3F4F6',
                    },
                  }}
                >
                  {!imagePreview && (
                    <>
                      <ImageIcon sx={{ fontSize: 40, color: '#9CA3AF', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Haz clic para subir imagen del evento
                      </Typography>
                    </>
                  )}
                  {imagePreview && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        Cambiar imagen
                      </Typography>
                    </Box>
                  )}
                </Box>
              </label>

              <TextField
                fullWidth
                label="Título del evento"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />

              <TextField
                fullWidth
                label="Descripción"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                multiline
                rows={3}
                required
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Fecha"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                />

                <TextField
                  fullWidth
                  label="Hora"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Box>

              <TextField
                fullWidth
                label="Ubicación"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <FormControl fullWidth required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  label="Categoría"
                >
                  {categories.filter(c => c !== 'Todos').map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Máximo de asistentes"
                type="number"
                value={newEvent.maxAttendees}
                onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Evento Premium
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Solo para suscriptores premium
                    </Typography>
                  </Box>
                  <Chip
                    label={newEvent.isPremium ? 'Activado' : 'Desactivado'}
                    onClick={() => setNewEvent({ ...newEvent, isPremium: !newEvent.isPremium })}
                    sx={{
                      fontWeight: 600,
                      cursor: 'pointer',
                      ...(newEvent.isPremium
                        ? {
                            background: 'linear-gradient(135deg, #53f682 0%, #2ecc71 100%)',
                            color: 'white',
                          }
                        : {
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                          }),
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button
              onClick={() => setOpenCreateDialog(false)}
              disabled={creating}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: '#6B7280',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateEvent}
              variant="contained"
              disabled={creating}
              startIcon={creating ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
                boxShadow: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e5fd9 0%, #2ecc71 100%)',
                  boxShadow: 'none',
                },
              }}
            >
              {creating ? 'Creando...' : 'Crear Evento'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default EventsPage;
