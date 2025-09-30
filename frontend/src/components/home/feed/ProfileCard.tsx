import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton, Rating } from '@mui/material';
import { Bookmark, Favorite, Close, Share } from '@mui/icons-material';

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

interface ProfileCardProps {
  profile: UserProfile;
  onLike?: () => void;
  onDislike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike = () => {},
  onDislike = () => {},
  onBookmark = () => {},
  onShare = () => {}
}) => {
  return (
    <Card sx={{ 
      width: '100%', 
      maxWidth: 400, 
      mx: 'auto',
      borderRadius: 2,
      boxShadow: 3,
      position: 'relative',
      overflow: 'visible',
      '&:hover': {
        transform: 'translateY(-4px)',
        transition: 'transform 0.2s ease-in-out',
      },
    }}>
      <Box sx={{ position: 'relative', paddingTop: '133.33%' }}>
        <CardMedia
          component="img"
          image={profile.photo || '/default-avatar.png'}
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
        
        <Box sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: 'primary.main',
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: 2,
        }}>
          {profile.compatibility}%
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              {profile.name}, {profile.age}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {profile.location} • {profile.distance} km
            </Typography>
          </Box>
          <Rating 
            value={profile.rating} 
            precision={0.5} 
            readOnly 
            size="small"
            sx={{ color: 'primary.main' }}
          />
        </Box>

        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {profile.interests?.slice(0, 4).map((interest, index) => (
            <Chip 
              key={index} 
              label={interest} 
              size="small" 
              sx={{ 
                fontSize: '0.7rem',
                bgcolor: 'rgba(25, 118, 210, 0.08)',
                color: 'primary.main',
              }} 
            />
          ))}
          {profile.interests && profile.interests.length > 4 && (
            <Chip 
              label={`+${profile.interests.length - 4}`} 
              size="small" 
              sx={{ 
                fontSize: '0.7rem',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              }} 
            />
          )}
        </Box>

        {profile.favoriteBook && (
          <Box sx={{ 
            bgcolor: 'rgba(0, 0, 0, 0.02)', 
            p: 1.5, 
            borderRadius: 1,
            mb: 2,
            borderLeft: '3px solid',
            borderColor: 'primary.main',
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Libro favorito
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, fontStyle: 'italic' }}>
              "{profile.favoriteBook.title}"
            </Typography>
            <Typography variant="caption" color="text.secondary">
              por {profile.favoriteBook.author}
            </Typography>
          </Box>
        )}

        <Typography variant="body2" sx={{ 
          mb: 2, 
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.5,
        }}>
          {profile.bio}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          pt: 1,
          '& > button': {
            flex: 1,
            mx: 0.5,
            '&:first-of-type': { ml: 0 },
            '&:last-child': { mr: 0 },
          }
        }}>
          <IconButton 
            onClick={onDislike} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
            }}
          >
            <Close color="error" />
          </IconButton>
          
          <IconButton 
            onClick={onBookmark} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
            }}
          >
            <Bookmark color="action" />
          </IconButton>
          
          <IconButton 
            onClick={onShare} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
            }}
          >
            <Share color="action" />
          </IconButton>
          
          <IconButton 
            onClick={onLike} 
            sx={{ 
              bgcolor: 'primary.light',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            <Favorite />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
