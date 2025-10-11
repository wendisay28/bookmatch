import React from 'react';
import { Box, Container } from '@mui/material';

// Secciones
import Section from '../components/home/sections/Section';
import CTASection from '../components/home/sections/CTASection';

// Componentes existentes
import HeroCarousel from '../components/home/HeroCarousel';
import TopProfiles from '../components/home/feed/TopProfiles';
import TopBooks from '../components/home/feed/TopBooks';
import ReadingRecommendations from '../components/home/feed/ReadingRecommendations';
import AlliesSection from '../components/home/AlliesSection';

// Datos mock
import {
  topExchangedBooks,
  topSellingBooks,
  readingRecommendations
} from '../data/mockHomeData';

// Mock data para perfiles (temporal)
const mockProfiles = [
  {
    name: 'María García',
    age: 28,
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    compatibility: 92,
    rating: 4.8,
    favoriteBook: { title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
    distance: 2.3,
    location: 'Bogotá'
  },
  {
    name: 'Carlos Méndez',
    age: 32,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    compatibility: 88,
    rating: 4.7,
    favoriteBook: { title: '1984', author: 'George Orwell' },
    distance: 3.5,
    location: 'Bogotá'
  },
  {
    name: 'Ana Torres',
    age: 25,
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    compatibility: 95,
    rating: 4.9,
    favoriteBook: { title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
    distance: 1.8,
    location: 'Bogotá'
  },
  {
    name: 'Luis Ramírez',
    age: 30,
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    compatibility: 85,
    rating: 4.6,
    favoriteBook: { title: 'Crimen y Castigo', author: 'Fiódor Dostoievski' },
    distance: 4.2,
    location: 'Bogotá'
  },
  {
    name: 'Sofía Vargas',
    age: 27,
    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
    compatibility: 90,
    rating: 4.8,
    favoriteBook: { title: 'La sombra del viento', author: 'Carlos Ruiz Zafón' },
    distance: 2.9,
    location: 'Bogotá'
  }
];

const HomePageNew: React.FC = () => {
  const handleProfileClick = (profile: any) => {
    console.log('Profile clicked:', profile);
  };

  const handleProfileLike = (profile: any) => {
    console.log('Profile liked:', profile);
  };

  const handleBookClick = (book: any) => {
    console.log('Book clicked:', book);
  };

  const handleRequestBook = (book: any) => {
    console.log('Request book:', book);
  };

  const handleViewDetails = (book: any) => {
    console.log('View details:', book);
  };

  return (
    <Box
      sx={{
        pt: { xs: '56px', sm: '64px' },
        pb: { xs: '80px', sm: 4 },
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* 1. Hero Carousel - Eventos y Talleres */}
        <Section noPadding>
          <HeroCarousel />
        </Section>

        {/* 2. Top Perfiles Destacados */}
        <Section
          emoji="👥"
          title="Lectores Destacados"
          subtitle="Conecta con miembros activos de la comunidad según tus gustos literarios"
          badge="PERFILES RECOMENDADOS"
        >
          <TopProfiles
            profiles={mockProfiles}
            onProfileClick={handleProfileClick}
            onLike={handleProfileLike}
          />
        </Section>

        {/* 3. Top Libros Más Intercambiados */}
        <Section
          emoji="📚"
          title="Más Intercambiados"
          subtitle="Los libros favoritos de la comunidad para intercambiar"
          badge="INTERCAMBIOS ACTIVOS"
        >
          <TopBooks
            books={topExchangedBooks}
            onBookClick={handleBookClick}
          />
        </Section>

        {/* 4. Top Libros Más Vendidos */}
        <Section
          emoji="💰"
          title="Bestsellers"
          subtitle="Los libros más vendidos en nuestro catálogo"
          badge="LOS MÁS VENDIDOS"
        >
          <TopBooks
            books={topSellingBooks}
            onBookClick={handleBookClick}
          />
        </Section>

        {/* 5. Recomendaciones Personalizadas */}
        <Section
          emoji="✨"
          title="Recomendado Para Ti"
          subtitle="Descubre tu próxima lectura basada en tus intereses"
          badge="PERSONALIZADO"
        >
          <ReadingRecommendations
            recommendations={readingRecommendations}
            onRequestBook={handleRequestBook}
            onViewDetails={handleViewDetails}
          />
        </Section>

        {/* 6. Aliados del Club */}
        <AlliesSection />

        {/* 7. Call to Action Final */}
        <CTASection />
      </Container>
    </Box>
  );
};

export default HomePageNew;
