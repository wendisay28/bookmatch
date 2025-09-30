import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import AIRecommendationModal from '../components/home/AIRecommendationModal';
import HeroCarousel from '../components/home/HeroCarousel';
import TopBooksSection from '../components/home/TopBooksSection';
import TopProfilesSection from '../components/home/TopProfilesSection';
import CategoryCarousel from '../components/home/CategoryCarousel';
import LeftSidebar from '../components/home/LeftSidebar';
import RightSidebar from '../components/home/RightSidebar';

// Mock data
const categoryCarousels = [
  {
    title: 'Clásicos que vuelven',
    books: [
      { title: 'Don Quijote', author: 'Cervantes', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
      { title: 'Orgullo y Prejuicio', author: 'Jane Austen', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
      { title: 'Moby Dick', author: 'Herman Melville', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80' },
      { title: 'La Odisea', author: 'Homero', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
      { title: 'Crimen y Castigo', author: 'Dostoievski', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
    ],
  },
  {
    title: 'Tendencias en tu ciudad',
    books: [
      { title: 'El Silencio', author: 'Don DeLillo', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
      { title: 'Klara y el Sol', author: 'Kazuo Ishiguro', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
      { title: 'La Hija Única', author: 'Guadalupe Nettel', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80' },
      { title: 'Hamnet', author: 'Maggie O\'Farrell', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
      { title: 'El Infinito en un Junco', author: 'Irene Vallejo', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
    ],
  },
  {
    title: 'Novedades recomendadas',
    books: [
      { title: 'Los Olvidados', author: 'Emiliano Monge', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80' },
      { title: 'El Mapa Fantasma', author: 'Steven Johnson', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
      { title: 'Biografía del Silencio', author: 'Pablo d\'Ors', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
      { title: 'Cultish', author: 'Amanda Montell', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80' },
      { title: 'El Baile', author: 'Irene Nemirovsky', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AI Recommendations Modal */}
      <AIRecommendationModal
        open={showAIRecommendations}
        onClose={() => setShowAIRecommendations(false)}
      />

      {/* Custom Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          zIndex: 1200,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 4,
          }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 1.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: '1.25rem',
                color: 'white',
              }}
            >
              B
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BookMatch
          </Typography>
        </Box>

        {/* Search Bar */}
        <TextField
          placeholder="Buscar libros, autores, comunidades..."
          size="small"
          sx={{
            flex: 1,
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              bgcolor: 'background.default',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Subscribe/Registered Button */}
        <Button
          variant={isSubscribed ? 'outlined' : 'contained'}
          sx={{
            ml: 3,
            borderRadius: 50,
            px: 3,
            fontWeight: 700,
            textTransform: 'none',
          }}
          onClick={() => setIsSubscribed(!isSubscribed)}
        >
          {isSubscribed ? 'Suscrito' : 'Registrarse'}
        </Button>
      </Box>

      {/* Main Layout - 3 Columns */}
      <Box sx={{ display: 'flex', pt: '64px' }}>
        {/* Left Sidebar */}
        <LeftSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenAI={() => setShowAIRecommendations(true)}
        />

        {/* Main Content Area - Dynamic width based on sidebar */}
        <Box
          sx={{
            ml: sidebarCollapsed ? '70px' : '20%',
            width: sidebarCollapsed ? 'calc(100% - 70px)' : '80%',
            transition: 'margin-left 0.3s ease, width 0.3s ease',
            pt: 1,
          }}
        >
          {/* Hero Carousel - Full width spanning central + right sidebar */}
          <Box sx={{ mb: 2.5, px: 3 }}>
            <HeroCarousel />
          </Box>

          {/* Central (60%) + Right Sidebar (20%) */}
          <Box sx={{ display: 'flex', gap: 3, px: 3 }}>
            {/* Central Feed - 75% of remaining space */}
            <Box sx={{ flex: 3 }}>
              {/* Top Books */}
              <TopBooksSection />

              {/* Top Profiles */}
              <TopProfilesSection />

              {/* Category Carousels */}
              {categoryCarousels.map((category, index) => (
                <CategoryCarousel key={index} title={category.title} books={category.books} />
              ))}
            </Box>

            {/* Right Sidebar - 25% of remaining space */}
            <RightSidebar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
