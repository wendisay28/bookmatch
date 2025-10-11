import React, { useRef } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Chip, Avatar } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
  School as WorkshopIcon,
  Campaign as PromoIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const carouselItems = [
  {
    id: 1,
    type: 'event',
    title: 'Club de Lectura: Gabriel García Márquez',
    description: 'Únete a nuestro próximo encuentro literario este sábado',
    date: '15 Octubre, 2025',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    creator: 'María García',
    creatorAvatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    type: 'workshop',
    title: 'Taller de Escritura Creativa',
    description: 'Aprende técnicas narrativas con autores profesionales',
    date: '20 Octubre, 2025',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    creator: 'Carlos López',
    creatorAvatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 3,
    type: 'promo',
    title: '¡Intercambio Gratuito este Mes!',
    description: 'Participa en nuestra campaña y recibe 3 intercambios gratis',
    date: 'Hasta fin de mes',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    creator: 'Ruedelo',
    creatorAvatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 4,
    type: 'event',
    title: 'Encuentro con Autores Locales',
    description: 'Conoce y conversa con escritores de tu ciudad',
    date: '25 Octubre, 2025',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    creator: 'Ana Martínez',
    creatorAvatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 5,
    type: 'workshop',
    title: 'Taller de Análisis Literario',
    description: 'Profundiza en la interpretación de obras clásicas',
    date: '30 Octubre, 2025',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80',
    creator: 'Luis Fernández',
    creatorAvatar: 'https://i.pravatar.cc/150?img=7',
  },
];

const HeroCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 500;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'event':
        return { icon: <EventIcon />, label: 'Evento', color: '#3B82F6' };
      case 'workshop':
        return { icon: <WorkshopIcon />, label: 'Taller', color: '#8B5CF6' };
      case 'promo':
        return { icon: <PromoIcon />, label: 'Promoción', color: '#10B981' };
      default:
        return { icon: <EventIcon />, label: 'Evento', color: '#3B82F6' };
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      mt: { xs: 3, sm: 4, md: 5 },
      mb: { xs: 2, sm: 3 }
    }}>
      <IconButton
        onClick={() => scrollCarousel('left')}
        sx={{
          position: 'absolute',
          left: { xs: 0, md: -20 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: { xs: 'none', sm: 'flex' },
          '&:hover': {
            bgcolor: 'white',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box
        ref={carouselRef}
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 2.5 },
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          pb: 2,
          width: '100%',
          px: { xs: 0, sm: 0 },
        }}
      >
        {carouselItems.map((item) => {
          const typeConfig = getTypeConfig(item.type);
          return (
            <Card
              key={item.id}
              component={motion.div}
              whileHover={{ scale: 1.03, y: -4 }}
              sx={{
                minWidth: { xs: 300, sm: 400, md: 480 },
                maxWidth: { xs: 300, sm: 400, md: 480 },
                height: { xs: 'auto', sm: 200 },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                cursor: 'pointer',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: '100%', sm: 220 },
                  height: { xs: 180, sm: '100%' },
                  objectFit: 'cover',
                  filter: 'brightness(0.9)',
                }}
                image={item.image}
                alt={item.title}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2.5,
                  background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,249,255,1) 100%)',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Chip
                      icon={typeConfig.icon}
                      label={typeConfig.label}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        bgcolor: `${typeConfig.color}15`,
                        color: typeConfig.color,
                        border: `1px solid ${typeConfig.color}40`,
                        '& .MuiChip-icon': { color: typeConfig.color },
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Avatar
                        src={item.creatorAvatar}
                        alt={item.creator}
                        sx={{ width: 24, height: 24, border: '2px solid white', boxShadow: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {item.creator}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight={800} gutterBottom sx={{ lineHeight: 1.3 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.description}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                  <CalendarIcon fontSize="small" />
                  <Typography variant="caption" fontWeight={600}>
                    {item.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <IconButton
        onClick={() => scrollCarousel('right')}
        sx={{
          position: 'absolute',
          right: { xs: 0, md: -20 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: { xs: 'none', sm: 'flex' },
          '&:hover': {
            bgcolor: 'white',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default HeroCarousel;
