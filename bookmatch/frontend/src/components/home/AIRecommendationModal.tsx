import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import {
  AutoAwesome as MagicIcon,
  Close as CloseIcon,
  EmojiObjects as InspireIcon,
  School as LearnIcon,
  SelfImprovement as RelaxIcon,
  Explore as AdventureIcon,
  Psychology as ReflectIcon,
  LocalLibrary as FictionIcon,
  Article as NonFictionIcon,
  Castle as CastleIcon,
  Rocket as RocketIcon,
  FavoriteBorder as RomanceIcon,
  MenuBook as MenuBookIcon,
  HistoryEdu as HistoryIcon,
  Business as BusinessIcon,
  Science as ScienceBookIcon,
} from '@mui/icons-material';

interface AIRecommendationModalProps {
  open: boolean;
  onClose: () => void;
}

const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [aiStep, setAiStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleClose = () => {
    setAiStep(0);
    setSelectedMood(null);
    setSelectedGenre(null);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={handleClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0,0,0,0.6)',
          zIndex: 9998,
        }}
      />

      {/* Modal */}
      <Paper
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: '85vh',
          maxHeight: '85vh',
          overflowY: 'auto',
          p: 4,
          borderRadius: 5,
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          zIndex: 9999,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,249,255,0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59, 130, 246, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MagicIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h5" fontWeight={800}>
              IA Mágica
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Step 1: Mood Selection */}
        {aiStep === 0 && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              ¿Cómo te sientes hoy?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Selecciona tu estado de ánimo y te recomendaré el libro perfecto
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, gridAutoRows: '180px' }}>
              {[
                { id: 'inspirado', label: 'Inspirado', desc: 'Quiero motivarme', icon: <InspireIcon sx={{ fontSize: 36 }} />, color: '#F59E0B' },
                { id: 'curioso', label: 'Curioso', desc: 'Aprender algo nuevo', icon: <LearnIcon sx={{ fontSize: 36 }} />, color: '#3B82F6' },
                { id: 'relajado', label: 'Relajado', desc: 'Disfrutar una historia', icon: <RelaxIcon sx={{ fontSize: 36 }} />, color: '#10B981' },
                { id: 'aventurero', label: 'Aventurero', desc: 'Una aventura épica', icon: <AdventureIcon sx={{ fontSize: 36 }} />, color: '#EF4444' },
                { id: 'reflexivo', label: 'Reflexivo', desc: 'Pensar profundamente', icon: <ReflectIcon sx={{ fontSize: 36 }} />, color: '#8B5CF6' },
                { id: 'emocionado', label: 'Emocionado', desc: 'Algo sorprendente', icon: <MagicIcon sx={{ fontSize: 36 }} />, color: '#EC4899' },
              ].map((mood) => (
                <Card
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: selectedMood === mood.id ? 2 : 1,
                    borderColor: selectedMood === mood.id ? mood.color : 'divider',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: selectedMood === mood.id ? `${mood.color}15` : 'white',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: mood.color,
                      boxShadow: `0 8px 16px ${mood.color}40`,
                    },
                  }}
                >
                  <Box sx={{ color: mood.color, mb: 1 }}>
                    {mood.icon}
                  </Box>
                  <Typography variant="body1" fontWeight={700} sx={{ mb: 0.5, fontSize: '1rem' }}>
                    {mood.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    {mood.desc}
                  </Typography>
                </Card>
              ))}
            </Box>
            <Button
              fullWidth
              variant="contained"
              disabled={!selectedMood}
              onClick={() => setAiStep(1)}
              sx={{ mt: 2, py: 1.5, fontWeight: 700, fontSize: '1rem' }}
            >
              Siguiente →
            </Button>
          </Box>
        )}

        {/* Step 2: Genre Selection */}
        {aiStep === 1 && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              ¿Qué género prefieres?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Elige el tipo de lectura que más te atrae
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, gridAutoRows: '115px' }}>
              {[
                { id: 'ficcion', label: 'Ficción', icon: <FictionIcon sx={{ fontSize: 26 }} />, color: '#3B82F6' },
                { id: 'no-ficcion', label: 'No Ficción', icon: <NonFictionIcon sx={{ fontSize: 26 }} />, color: '#10B981' },
                { id: 'fantasia', label: 'Fantasía', icon: <CastleIcon sx={{ fontSize: 26 }} />, color: '#8B5CF6' },
                { id: 'ciencia-ficcion', label: 'Ciencia Ficción', icon: <RocketIcon sx={{ fontSize: 26 }} />, color: '#06B6D4' },
                { id: 'romance', label: 'Romance', icon: <RomanceIcon sx={{ fontSize: 26 }} />, color: '#EC4899' },
                { id: 'thriller', label: 'Thriller', icon: <MenuBookIcon sx={{ fontSize: 26 }} />, color: '#EF4444' },
                { id: 'historia', label: 'Historia', icon: <HistoryIcon sx={{ fontSize: 26 }} />, color: '#F59E0B' },
                { id: 'biografia', label: 'Biografía', icon: <BusinessIcon sx={{ fontSize: 26 }} />, color: '#64748B' },
                { id: 'ciencia', label: 'Ciencia', icon: <ScienceBookIcon sx={{ fontSize: 26 }} />, color: '#0EA5E9' },
              ].map((genre) => (
                <Card
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  sx={{
                    p: 1.5,
                    cursor: 'pointer',
                    border: selectedGenre === genre.id ? 2 : 1,
                    borderColor: selectedGenre === genre.id ? genre.color : 'divider',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: selectedGenre === genre.id ? `${genre.color}15` : 'white',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: genre.color,
                      boxShadow: `0 8px 16px ${genre.color}40`,
                    },
                  }}
                >
                  <Box sx={{ color: genre.color, mb: 0.5 }}>
                    {genre.icon}
                  </Box>
                  <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.8rem' }}>
                    {genre.label}
                  </Typography>
                </Card>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setAiStep(0)}
                sx={{ py: 1.5, fontWeight: 700, fontSize: '1rem', flex: 1 }}
              >
                ← Atrás
              </Button>
              <Button
                variant="contained"
                disabled={!selectedGenre}
                onClick={() => setAiStep(2)}
                sx={{ py: 1.5, fontWeight: 700, fontSize: '1rem', flex: 2 }}
              >
                Ver Recomendaciones →
              </Button>
            </Box>
          </Box>
        )}

        {/* Step 3: AI Recommendations */}
        {aiStep === 2 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <MagicIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  Tus Recomendaciones Mágicas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Basado en tu estado de ánimo: <strong>{selectedMood}</strong> y género: <strong>{selectedGenre}</strong>
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {[
                {
                  title: 'El Alquimista',
                  author: 'Paulo Coelho',
                  cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
                  match: 95,
                  description: 'Una historia inspiradora sobre seguir tus sueños',
                },
                {
                  title: 'Cien Años de Soledad',
                  author: 'Gabriel García Márquez',
                  cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80',
                  match: 88,
                  description: 'Una obra maestra del realismo mágico latinoamericano',
                },
                {
                  title: 'El Principito',
                  author: 'Antoine de Saint-Exupéry',
                  cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80',
                  match: 82,
                  description: 'Una fábula poética que toca el corazón',
                },
              ].map((book, index) => (
                <Card
                  key={index}
                  sx={{
                    display: 'flex',
                    p: 2.5,
                    gap: 2.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 100,
                      height: 150,
                      borderRadius: 3,
                      objectFit: 'cover',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                    image={book.cover}
                    alt={book.title}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {book.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                      {book.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                          color: 'white',
                        }}
                      >
                        <MagicIcon sx={{ fontSize: 18 }} />
                        <Typography variant="body2" fontWeight={700}>
                          {book.match}% match
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setAiStep(0);
                  setSelectedMood(null);
                  setSelectedGenre(null);
                }}
                sx={{ py: 1.8, fontWeight: 700, fontSize: '1.05rem', flex: 1 }}
              >
                ← Buscar de Nuevo
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/explore')}
                sx={{ py: 1.8, fontWeight: 700, fontSize: '1.05rem', flex: 1 }}
              >
                Explorar Más
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default AIRecommendationModal;
