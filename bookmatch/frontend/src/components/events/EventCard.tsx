import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Event } from '../../types/events';

interface EventCardProps {
  event: Event;
  index: number;
  isFavorite: boolean;
  isOwnEvent: boolean;
  onToggleFavorite: (eventId: string | number) => void;
  onDelete?: (eventId: string, eventImage: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  index,
  isFavorite,
  isOwnEvent,
  onToggleFavorite,
  onDelete,
}) => {
  return (
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

        {/* Premium Badge */}
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

        {/* Action Buttons */}
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
            onClick={() => onToggleFavorite(event.id)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            {isFavorite ? (
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

        {/* Event Details */}
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

        {/* Action Buttons */}
        {isOwnEvent ? (
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
            {onDelete && (
              <Button
                variant="outlined"
                onClick={() => onDelete(event.id as string, event.image)}
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
            )}
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
  );
};

export default EventCard;
