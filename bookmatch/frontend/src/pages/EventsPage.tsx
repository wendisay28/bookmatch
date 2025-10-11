import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import {
  Container,
  Grid,
  Box,
  Fab,
  Typography,
  Alert,
  Skeleton
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import { Event, NewEventForm } from '../types/events';
import { mockEvents } from '../data/mockEvents';
import EventsHeader from '../components/events/EventsHeader';
import EventFilters from '../components/events/EventFilters';
import EventCard from '../components/events/EventCard';
import CreateEventDialog from '../components/events/CreateEventDialog';

const EventsPage: React.FC = () => {
  const { user } = useAuth();

  // -- Estados de UI y lógica --
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentTab, setCurrentTab] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);

  const [creating, setCreating] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [newEvent, setNewEvent] = useState<NewEventForm>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    maxAttendees: '',
    isPremium: false,
  });

  // -- Efecto para cargar eventos desde Supabase al montarse --
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setErrorLoading(null);
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const loadedEvents = (data || []).map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          category: event.category,
          maxAttendees: event.max_attendees || 50,
          attendees: event.attendees || 0,
          isPremium: event.is_premium || false,
          image: event.image || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
          host: {
            name: event.host_name || 'Anónimo',
            avatar: event.host_avatar || 'https://i.pravatar.cc/150?img=1',
            userId: event.host_user_id || ''
          },
          createdAt: event.created_at
        })) as Event[];

        // Combinar con mockEvents
        setEvents([...mockEvents, ...loadedEvents]);
      } catch (err) {
        console.error('Error al cargar eventos:', err);
        setErrorLoading('No se pudieron cargar los eventos. Mostrando eventos de ejemplo.');
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // -- Filtrado con memo para evitar recomputaciones innecesarias --
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || evt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  // -- Función para alternar favorito --
  const toggleFavorite = (eventId: string | number) => {
    const idStr = String(eventId);
    setFavorites(prev =>
      prev.some(id => String(id) === idStr)
        ? prev.filter(id => String(id) !== idStr)
        : [...prev, idStr]
    );
  };

  // -- Manejo de imagen seleccionada --
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  // -- Manejo de cambios en el formulario del nuevo evento --
  const handleEventChange = (changes: Partial<NewEventForm>) => {
    setNewEvent(prev => ({ ...prev, ...changes }));
  };

  // -- Validación antes de crear --
  const validateNewEvent = (): string | null => {
    if (!newEvent.title.trim()) return 'El título es obligatorio';
    if (!newEvent.date) return 'La fecha es obligatoria';
    if (!newEvent.time) return 'La hora es obligatoria';
    if (!newEvent.location.trim()) return 'La ubicación es obligatoria';
    if (!newEvent.category.trim()) return 'La categoría es obligatoria';
    return null;
  };

  // -- Crear nuevo evento --
  const handleCreateEvent = async () => {
    if (!user) {
      alert('Debes iniciar sesión para crear un evento');
      return;
    }
    const validationError = validateNewEvent();
    if (validationError) {
      alert(validationError);
      return;
    }
    setCreating(true);

    try {
      let imageUrl =
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80';

      // Subir imagen si existe
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('events')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Error subiendo imagen:', uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('events')
            .getPublicUrl(filePath);
          imageUrl = publicUrl;
        }
      }

      // Insertar evento en Supabase
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        category: newEvent.category,
        max_attendees: parseInt(newEvent.maxAttendees) || 50,
        attendees: 0,
        is_premium: newEvent.isPremium,
        image: imageUrl,
        host_name: user.name,
        host_avatar: user.avatar || 'https://i.pravatar.cc/150?img=1',
        host_user_id: user.id,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;

      // Agregar evento a la lista local
      const newEventObj: Event = {
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        location: data.location,
        category: data.category,
        maxAttendees: data.max_attendees,
        attendees: data.attendees,
        isPremium: data.is_premium,
        image: data.image,
        host: {
          name: data.host_name,
          avatar: data.host_avatar,
          userId: data.host_user_id
        },
        createdAt: data.created_at
      };

      setEvents(prev => [newEventObj, ...prev]);

      // Resetear formulario
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
      alert('Evento creado exitosamente');
    } catch (err: any) {
      console.error('Error creando evento:', err);
      alert(`No se pudo crear el evento: ${err?.message || err}`);
    } finally {
      setCreating(false);
    }
  };

  // -- Eliminar evento --
  const handleDeleteEvent = async (eventId: string | number, eventImage: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este evento?')) {
      return;
    }
    try {
      // Eliminar de Supabase
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      // Si la imagen no es la por defecto, borrarla de Supabase Storage
      if (eventImage && !eventImage.includes('unsplash.com')) {
        const parts = eventImage.split('/');
        const imagePath = parts[parts.length - 1];
        if (imagePath) {
          await supabase.storage
            .from('events')
            .remove([imagePath]);
        }
      }

      setEvents(prev => prev.filter(evt => evt.id !== eventId));
      alert('Evento eliminado exitosamente');
    } catch (err) {
      console.error('Error eliminando evento:', err);
      alert('No se pudo eliminar el evento.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        pt: '80px',
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header con tabs y búsqueda */}
        <EventsHeader
          currentTab={currentTab}
          searchQuery={searchQuery}
          onTabChange={(e, v) => setCurrentTab(v)}
          onSearchChange={e => setSearchQuery(e.target.value)}
        />

        {/* Filtros de categorías */}
        <Box mt={2}>
          <EventFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </Box>

        {/* Contenido principal */}
        <Box mt={3}>
          {loading ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Skeleton variant="rectangular" height={200} />
                </Grid>
              ))}
            </Grid>
          ) : errorLoading ? (
            <Alert severity="error">{errorLoading}</Alert>
          ) : filteredEvents.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="h6" color="textSecondary">
                No hay eventos para mostrar
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredEvents.map((evt, idx) => (
                <Grid item xs={12} sm={6} lg={4} key={evt.id}>
                  <EventCard
                    event={evt}
                    index={idx}
                    isFavorite={favorites.some(favId => String(favId) === String(evt.id))}
                    isOwnEvent={
                      user ? evt.host?.userId === user.id : false
                    }
                    onToggleFavorite={() => toggleFavorite(evt.id)}
                    onDelete={() =>
                      handleDeleteEvent(evt.id, evt.image)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Botón flotante para crear evento */}
        <Fab
          color="primary"
          aria-label="crear evento"
          onClick={() => setOpenCreateDialog(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, #2E6FF2 0%, #53F682 100%)',
            boxShadow: '0 8px 20px rgba(46, 111, 242, 0.4)',
            '&:hover': {
              background:
                'linear-gradient(135deg, #1E5FD9 0%, #2ECC71 100%)',
              boxShadow: '0 12px 30px rgba(46, 111, 242, 0.5)',
            },
          }}
        >
          <AddIcon />
        </Fab>

        {/* Diálogo para crear evento */}
        <CreateEventDialog
          open={openCreateDialog}
          creating={creating}
          newEvent={newEvent}
          imagePreview={imagePreview}
          onClose={() => setOpenCreateDialog(false)}
          onImageChange={handleImageChange}
          onEventChange={handleEventChange}
          onSubmit={handleCreateEvent}
        />
      </Container>
    </Box>
  );
};

export default EventsPage;
