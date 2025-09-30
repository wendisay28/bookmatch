import React from 'react';
import { Box, Card, Avatar, Typography, Rating } from '@mui/material';

const topProfiles = [
  {
    id: 1,
    name: 'María García',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 4.8,
    exchanges: 45,
  },
  {
    id: 2,
    name: 'Carlos López',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 4.9,
    exchanges: 52,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4.7,
    exchanges: 38,
  },
  {
    id: 4,
    name: 'Luis Fernández',
    avatar: 'https://i.pravatar.cc/150?img=7',
    rating: 4.6,
    exchanges: 41,
  },
];

const TopProfilesSection: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Perfiles Mejor Valorados
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        {topProfiles.map((profile) => (
          <Card
            key={profile.id}
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
            />
            <Typography variant="body1" fontWeight={700}>
              {profile.name}
            </Typography>
            <Rating value={profile.rating} readOnly precision={0.1} size="small" sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {profile.exchanges} intercambios
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopProfilesSection;
