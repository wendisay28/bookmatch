import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, Avatar, AvatarGroup } from '@mui/material';
import { AutoAwesome, TrendingUp, Group } from '@mui/icons-material';

interface Recommendation {
  id: number;
  title: string;
  author: string;
  cover: string;
  reason: string;
  matchScore: number;
  genres: string[];
  readBy: string[];
  available: boolean;
}

interface ReadingRecommendationsProps {
  recommendations: Recommendation[];
  onRequestBook?: (book: Recommendation) => void;
  onViewDetails?: (book: Recommendation) => void;
}

const ReadingRecommendations: React.FC<ReadingRecommendationsProps> = ({
  recommendations,
  onRequestBook,
  onViewDetails
}) => {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AutoAwesome sx={{ color: 'primary.main' }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Recomendaciones para Ti</Typography>
          <Typography variant="caption" color="text.secondary">Basadas en tus intereses y lecturas</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {recommendations.map((rec: Recommendation) => (
          <Card
            key={rec.id}
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Book Cover */}
                <Box
                  sx={{
                    flex: '0 0 auto',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={rec.cover}
                    alt={rec.title}
                    sx={{
                      width: 80,
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 1,
                      boxShadow: 2,
                    }}
                  />
                  {rec.available && (
                    <Chip
                      label="Disponible"
                      size="small"
                      color="success"
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.65rem',
                        height: 20,
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>

                {/* Book Info */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {rec.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {rec.author}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      <TrendingUp sx={{ fontSize: '1rem' }} />
                      {rec.matchScore}% match
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
                    {rec.genres.map((genre, idx) => (
                      <Chip
                        key={idx}
                        label={genre}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: 22 }}
                      />
                    ))}
                  </Box>

                  <Box
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1,
                      p: 1.5,
                      mb: 1.5,
                      borderLeft: 3,
                      borderColor: 'primary.main',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      "{rec.reason}"
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Group sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                      <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.7rem' } }}>
                        {rec.readBy.map((reader, idx) => (
                          <Avatar key={idx} sx={{ bgcolor: 'primary.main' }}>
                            {reader.charAt(0)}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                      <Typography variant="caption" color="text.secondary">
                        {rec.readBy.length} amigos lo leyeron
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onViewDetails?.(rec)}
                        sx={{ textTransform: 'none' }}
                      >
                        Ver detalles
                      </Button>
                      {rec.available && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => onRequestBook?.(rec)}
                          sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                          Solicitar
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReadingRecommendations;
