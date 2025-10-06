import React, { useState } from 'react';
import { Box, Divider, Drawer, useTheme, useMediaQuery } from '@mui/material';
import LeftSidebar from '../components/home/LeftSidebar';
import HeroCarousel from '../components/home/HeroCarousel';
import AIRecommendationModal from '../components/home/AIRecommendationModal';
import TopProfiles from '../components/home/feed/TopProfiles';
import TopBooks from '../components/home/feed/TopBooks';
import ReadingRecommendations from '../components/home/feed/ReadingRecommendations';
import AlliesSection from '../components/home/AlliesSection';
import { useMenu } from '../context/MenuContext';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useMenu();

  return (
    <Box sx={{
      display: 'flex',
      pt: '64px',
      minHeight: 'calc(100vh - 64px)',
      bgcolor: 'background.default',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100vw'
    }}>
      {/* AI Recommendations Modal */}
      <AIRecommendationModal
        open={showAIRecommendations}
        onClose={() => setShowAIRecommendations(false)}
      />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            zIndex: 1300,
            pt: 2,
          },
        }}
      >
        <LeftSidebar
          collapsed={false}
          onToggleCollapse={() => {}}
          onOpenAI={() => {
            setShowAIRecommendations(true);
            setMobileMenuOpen(false);
          }}
          isMobile={true}
          onClose={() => setMobileMenuOpen(false)}
        />
      </Drawer>

      {/* Desktop Left Sidebar */}
      <Box sx={{
        display: { xs: 'none', md: 'block' },
        position: 'fixed',
        left: 0,
        top: '64px',
        bottom: 0,
        zIndex: 100,
        width: sidebarCollapsed ? '64px' : '180px',
        transition: 'width 0.3s ease',
        backgroundColor: 'background.paper',
        boxShadow: 1,
        overflow: 'hidden'
      }}>
        <LeftSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenAI={() => setShowAIRecommendations(true)}
        />
      </Box>

      {/* Contenedor Principal */}
      <Box sx={{
        position: 'fixed',
        left: {
          xs: 0,
          md: sidebarCollapsed ? '64px' : '180px'
        },
        right: 0,
        top: '64px',
        bottom: { xs: '70px', md: 0 },
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'left 0.3s ease',
        boxSizing: 'border-box',
        backgroundColor: 'background.default',
        width: 'auto'
      }}>
        {/* Contenedor del carrusel */}
        <Box sx={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          position: 'relative',
          mb: 3,
          overflow: 'hidden',
          px: { xs: 1, sm: 2 }
        }}>
          <Box sx={{
            width: '100%',
            position: 'relative',
          }}>
            <HeroCarousel />
          </Box>
        </Box>

        {/* Línea divisoria */}
        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        {/* Contenedor principal */}
        <Box sx={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          px: { xs: 1, sm: 2 }
        }}>
          {/* Feed principal */}
          <Box sx={{
            width: '100%'
          }}>
            {/* Top Profiles Section */}
            <TopProfiles
              profiles={[
                {
                  name: 'María García',
                  age: 28,
                  location: 'Madrid',
                  distance: 5,
                  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                  compatibility: 85,
                  rating: 4.5,
                  interests: ['Ficción', 'Romance', 'Fantasía'],
                  favoriteBook: { title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
                  bio: 'Amante de la literatura latinoamericana y los cafés tranquilos.'
                },
                {
                  name: 'Carlos López',
                  age: 32,
                  location: 'Barcelona',
                  distance: 10,
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                  compatibility: 78,
                  rating: 4.2,
                  interests: ['Ciencia ficción', 'Tecnología', 'Historia'],
                  favoriteBook: { title: '1984', author: 'George Orwell' },
                  bio: 'Ingeniero de día, lector empedernido de noche.'
                },
                {
                  name: 'Ana Martínez',
                  age: 25,
                  location: 'Valencia',
                  distance: 8,
                  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                  compatibility: 92,
                  rating: 4.8,
                  interests: ['Poesía', 'Filosofía', 'Arte'],
                  favoriteBook: { title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez' },
                  bio: 'Poeta en formación y coleccionista de libros antiguos.'
                },
              ]}
              onProfileClick={(profile) => console.log('Profile clicked:', profile)}
              onLike={(profile) => console.log('Liked:', profile)}
            />

            {/* Top Books Section */}
            <TopBooks
              books={[
                {
                  id: 1,
                  title: 'Cien años de soledad',
                  author: 'Gabriel García Márquez',
                  exchanges: 47,
                  rating: 4.8,
                  cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
                  currentHolder: 'María G.',
                  holderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
                  category: 'Realismo Mágico'
                },
                {
                  id: 2,
                  title: '1984',
                  author: 'George Orwell',
                  exchanges: 42,
                  rating: 4.7,
                  cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
                  currentHolder: 'Carlos L.',
                  holderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
                  category: 'Distopía'
                },
                {
                  id: 3,
                  title: 'El amor en los tiempos del cólera',
                  author: 'Gabriel García Márquez',
                  exchanges: 38,
                  rating: 4.6,
                  cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop',
                  currentHolder: 'Ana M.',
                  holderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
                  category: 'Romance'
                },
                {
                  id: 4,
                  title: 'Rayuela',
                  author: 'Julio Cortázar',
                  exchanges: 35,
                  rating: 4.5,
                  cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
                  currentHolder: 'Pedro R.',
                  holderAvatar: 'https://placehold.co/50x50/333333/ffffff?text=PR',
                  category: 'Experimental'
                },
                {
                  id: 5,
                  title: 'La sombra del viento',
                  author: 'Carlos Ruiz Zafón',
                  exchanges: 33,
                  rating: 4.7,
                  cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
                  currentHolder: 'Laura V.',
                  holderAvatar: 'https://placehold.co/50x50/F59E0B/000000?text=LV',
                  category: 'Misterio'
                },
              ]}
              onBookClick={(book) => console.log('Book clicked:', book)}
            />

            {/* Reading Recommendations Section */}
            <ReadingRecommendations
              recommendations={[
                {
                  id: 1,
                  title: 'El nombre del viento',
                  author: 'Patrick Rothfuss',
                  cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop',
                  reason: 'Basado en tu amor por la fantasía y tu calificación alta de "El Señor de los Anillos"',
                  matchScore: 94,
                  genres: ['Fantasía', 'Aventura', 'Magia'],
                  readBy: ['María', 'Carlos', 'Ana', 'Pedro'],
                  available: true
                },
                {
                  id: 2,
                  title: 'Los detectives salvajes',
                  author: 'Roberto Bolaño',
                  cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=200&h=300&fit=crop',
                  reason: 'Similar a tu interés en narrativas complejas y literatura latinoamericana',
                  matchScore: 88,
                  genres: ['Literatura', 'Vanguardia', 'Poesía'],
                  readBy: ['Laura', 'Ricardo', 'Elena'],
                  available: true
                },
                {
                  id: 3,
                  title: 'Sapiens',
                  author: 'Yuval Noah Harari',
                  cover: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=200&h=300&fit=crop',
                  reason: 'Conecta con tu interés en historia y pensamiento crítico',
                  matchScore: 85,
                  genres: ['Historia', 'Ciencia', 'Filosofía'],
                  readBy: ['Carlos', 'Marina'],
                  available: false
                },
              ]}
              onRequestBook={(book) => console.log('Request book:', book)}
              onViewDetails={(book) => console.log('View details:', book)}
            />

            {/* Allies Section */}
            <AlliesSection />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;