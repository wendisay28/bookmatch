import React from 'react';
import { Box, Typography, IconButton, Card, CardContent, CardActionArea } from '@mui/material';
import { ChevronLeft, ChevronRight, Favorite } from '@mui/icons-material';

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
          gap: 2,
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
              width: 150,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <CardActionArea onClick={() => onProfileClick?.(profile)}>
              <Box sx={{ position: 'relative', paddingTop: '133.33%' }}>
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
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 1,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 600,
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {profile.name}, {profile.age}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '0.6rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      }}
                    >
                      {profile.distance} km
                    </Typography>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        p: 0.5,
                        color: 'white',
                        '&:hover': { color: '#ff4081' },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onLike?.(profile);
                      }}
                    >
                      <Favorite fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
            
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.7rem',
                  lineHeight: 1.3,
                }}
              >
                {profile.bio?.substring(0, 60)}{profile.bio && profile.bio.length > 60 ? '...' : ''}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Box sx={{ 
                  flexGrow: 1, 
                  height: 4, 
                  bgcolor: 'rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}>
                  <Box 
                    sx={{ 
                      width: `${profile.compatibility}%`, 
                      height: '100%', 
                      bgcolor: 'primary.main',
                      borderRadius: 2,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    ml: 1, 
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                >
                  {profile.compatibility}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopProfiles;
