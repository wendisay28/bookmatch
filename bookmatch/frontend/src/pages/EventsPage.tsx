import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { collection, addDoc, getDocs, query, orderBy, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import { Event, NewEventForm } from '../types/events';
import { mockEvents } from '../data/mockEvents';
import EventsHeader from '../components/events/EventsHeader';
import EventFilters from '../components/events/EventFilters';
import EventCard from '../components/events/EventCard';
import CreateEventDialog from '../components/events/CreateEventDialog';

const EventsPage = () => {
  const { user } = useAuth();

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentTab, setCurrentTab] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
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

  // Load events from Firestore
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsQuery = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(eventsQuery);
        const loadedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
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

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle favorite
  const toggleFavorite = (eventId: string | number) => {
    setFavorites(prev =>
      prev.includes(eventId as number) ? prev.filter(id => id !== eventId) : [...prev, eventId as number]
    );
  };

  // Handle image upload
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

  // Handle event form changes
  const handleEventChange = (changes: Partial<NewEventForm>) => {
    setNewEvent(prev => ({ ...prev, ...changes }));
  };

  // Create new event
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

      // Upload image to Supabase Storage if exists
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('events')
            .upload(filePath, imageFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Error uploading image to Supabase:', uploadError);
            console.warn('Using default image instead');
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('events')
              .getPublicUrl(filePath);

            imageUrl = publicUrl;
            console.log('Image uploaded successfully:', imageUrl);
          }
        } catch (imgError) {
          console.error('Image upload failed:', imgError);
          console.warn('Continuing with default image');
        }
      }

      // Create event in Firestore
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

      // Add event to local list
      setEvents(prev => [{
        id: docRef.id,
        ...eventData,
      } as Event, ...prev]);

      // Reset form
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

  // Delete event
  const handleDeleteEvent = async (eventId: string, eventImage: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'events', eventId));

      // Delete image from Supabase if not default
      if (eventImage && !eventImage.includes('unsplash.com')) {
        try {
          const imagePath = eventImage.split('/').pop();
          if (imagePath) {
            await supabase.storage.from('events').remove([imagePath]);
          }
        } catch (imgError) {
          console.error('Error deleting image:', imgError);
        }
      }

      setEvents(prev => prev.filter(event => event.id !== eventId));
      alert('Evento eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error al eliminar el evento. Por favor intenta de nuevo.');
    }
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
        {/* Header with Tabs and Search */}
        <EventsHeader
          currentTab={currentTab}
          searchQuery={searchQuery}
          onTabChange={(e, newValue) => setCurrentTab(newValue)}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Filters */}
        <EventFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Events Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id}>
              <EventCard
                event={event}
                index={index}
                isFavorite={favorites.includes(event.id as number)}
                isOwnEvent={user ? event.host?.userId === user.id : false}
                onToggleFavorite={toggleFavorite}
                onDelete={handleDeleteEvent}
              />
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
