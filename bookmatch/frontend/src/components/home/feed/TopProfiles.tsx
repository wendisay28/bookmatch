import React from 'react';
import { Box, Typography, IconButton, Card, CardActionArea } from '@mui/material';
import { ChevronLeft, ChevronRight, Favorite, LocationOn, Star, MenuBook } from '@mui/icons-material';

// Definir interfaces necesarias
interface Book {
  title: string;
  author: string;
}

export interface UserProfile {
  name: string;
  age: number;
  location: string;
  distance: number;
  photo?: string;
  compatibility: number;
  rating: number;
  interests?: string[];
  favoriteBook?: Book;
  bio?: string;
}

interface TopProfilesProps {
  profiles: UserProfile[];
  onProfileClick?: (profile: UserProfile) => void;
  onLike?: (profile: UserProfile) => void;
}

const TopProfiles: React.FC<TopProfilesProps> = ({ profiles, onProfileClick, onLike }) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      const newScrollPosition = scrollPosition + scrollOffset;
      scrollContainerRef.current.scrollLeft = newScrollPosition;
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Recomendados para ti</Typography>
        <Box>
          <IconButton 
            size="small" 
            onClick={() => scroll(-200)}
            sx={{ mr: 1, bgcolor: 'rgba(0,0,0,0.04)' }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => scroll(200)}
            sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          pb: 2,
          mx: -2,
          px: 2,
        }}
      >
        {profiles.map((profile: UserProfile, index: number) => (
          <Card
            key={index}
            sx={{
              flex: '0 0 auto',
              width: 200,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              position: 'relative',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              },
            }}
          >
            <CardActionArea onClick={() => onProfileClick?.(profile)}>
              <Box sx={{ position: 'relative', paddingTop: '130%' }}>
                <Box
                  component="img"
                  src={profile.photo || '/default-avatar.png'}
                  alt={profile.name}
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
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    color: 'primary.main',
                    borderRadius: '16px',
                    px: 1.5,
                    py: 0.75,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: profile.compatibility > 85 ? 'success.main' : 'warning.main',
                    }}
                  />
                  {profile.compatibility}%
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '1rem',
                      mb: 0.5,
                    }}
                  >
                    {profile.name}, {profile.age}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <LocationOn sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.9)',
                          fontSize: '0.8rem',
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                        }}
                      >
                        {profile.distance} km
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '8px',
                        px: 1,
                        py: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Star sx={{ fontSize: '0.9rem', color: '#FFC107' }} />
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      >
                        {profile.rating}
                      </Typography>
                    </Box>
                  </Box>
                  {profile.favoriteBook && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      <MenuBook sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }} />
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255,255,255,0.85)',
                          fontSize: '0.7rem',
                          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontStyle: 'italic',
                        }}
                      >
                        {profile.favoriteBook.title}
                      </Typography>
                    </Box>
                  )}
                  <IconButton
                    size="medium"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      p: 1,
                      color: 'white',
                      bgcolor: 'rgba(255, 64, 129, 0.8)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 64, 129, 1)',
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike?.(profile);
                    }}
                  >
                    <Favorite sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopProfiles;
