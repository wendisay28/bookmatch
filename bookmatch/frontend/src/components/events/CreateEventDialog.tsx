import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Image as ImageIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { NewEventForm, EVENT_CATEGORIES } from '../../types/events';

interface CreateEventDialogProps {
  open: boolean;
  creating: boolean;
  newEvent: NewEventForm;
  imagePreview: string;
  onClose: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEventChange: (event: Partial<NewEventForm>) => void;
  onSubmit: () => void;
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  open,
  creating,
  newEvent,
  imagePreview,
  onClose,
  onImageChange,
  onEventChange,
  onSubmit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          <IconButton onClick={onClose} size="small">
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
            onChange={onImageChange}
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

          {/* Title */}
          <TextField
            fullWidth
            label="Título del evento"
            value={newEvent.title}
            onChange={(e) => onEventChange({ title: e.target.value })}
            required
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Descripción"
            value={newEvent.description}
            onChange={(e) => onEventChange({ description: e.target.value })}
            multiline
            rows={3}
            required
          />

          {/* Date and Time */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              value={newEvent.date}
              onChange={(e) => onEventChange({ date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              fullWidth
              label="Hora"
              type="time"
              value={newEvent.time}
              onChange={(e) => onEventChange({ time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          {/* Location */}
          <TextField
            fullWidth
            label="Ubicación"
            value={newEvent.location}
            onChange={(e) => onEventChange({ location: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon />
                </InputAdornment>
              ),
            }}
            required
          />

          {/* Category */}
          <FormControl fullWidth required>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={newEvent.category}
              onChange={(e) => onEventChange({ category: e.target.value })}
              label="Categoría"
            >
              {EVENT_CATEGORIES.filter((c) => c !== 'Todos').map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Max Attendees */}
          <TextField
            fullWidth
            label="Máximo de asistentes"
            type="number"
            value={newEvent.maxAttendees}
            onChange={(e) => onEventChange({ maxAttendees: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupIcon />
                </InputAdornment>
              ),
            }}
            required
          />

          {/* Premium Toggle */}
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
                onClick={() => onEventChange({ isPremium: !newEvent.isPremium })}
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
          onClick={onClose}
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
          onClick={onSubmit}
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
  );
};

export default CreateEventDialog;
