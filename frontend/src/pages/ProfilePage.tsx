import { Box, Container, Grid } from '@mui/material';
import { ProfileCover } from '../components/profile/ProfileCover';
import { ProfileSidebar } from '../components/profile/ProfileSidebar';
import { ProfileMainContent } from '../components/profile/ProfileMainContent';
import { CurrentBookCard } from '../components/profile/CurrentBookCard';

const ProfilePage = () => {
  const userData = {
    name: "Sofía Martínez",
    userId: "user-007-gabo",
    memberSince: "Enero 2024",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop",
    quote: "No hay amigo más leal que un libro — Ernest Hemingway",
    readerLevel: 4,
    levelProgressPercent: 35,
    booksLinked: 45,
    totalExchanges: 23,
    eventsAttended: 12
  };

  const myBooks = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', code: 'TFT-001A', exchanges: 4, current: 'Laura V.' },
    { id: 2, title: 'El laberinto de la soledad', author: 'Octavio Paz', code: 'TFT-002B', exchanges: 2, current: 'Carlos J.' },
    { id: 3, title: 'Rayuela', author: 'Julio Cortázar', code: 'TFT-003C', exchanges: 7, current: 'María S.' }
  ];

  const badges = [
    { id: 1, name: "Explorador Literario", icon: "🧭", description: "Completó su primer intercambio", rarity: "uncommon" },
    { id: 2, name: "Top Lector", icon: "👑", description: "Intercambió 10+ libros en un mes", rarity: "legendary" },
    { id: 3, name: "Guardián de Libros", icon: "🛡️", description: "Tiempo promedio ejemplar", rarity: "epic" },
    { id: 4, name: "Curador de Colección", icon: "📚", description: "Ha vinculado más de 30 libros", rarity: "rare" }
  ];

  const exchangeHistory = [
    { id: 1, title: 'Cien años de soledad', type: 'Intercambio', date: '15/07/2025', status: 'Completado' },
    { id: 2, title: 'El nombre del viento', type: 'Préstamo', date: '01/08/2025', status: 'Completado' },
    { id: 3, title: 'Don Quijote de la Mancha', type: 'Intercambio', date: '10/09/2025', status: 'En Proceso' }
  ];

  const currentBook = {
    id: 501,
    title: 'El arte de la guerra',
    author: 'Sun Tzu',
    code: 'TFT-777T',
    daysHeld: 45,
    img: 'https://placehold.co/100x150/14B8A6/ffffff?text=ACTUAL'
  };

  const handleViewTracking = () => {
    console.log('Ver trazabilidad del libro actual');
  };

  const handleSetAvailable = () => {
    console.log('Configurar disponibilidad del libro');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <ProfileCover coverUrl={userData.coverUrl} />

      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ProfileSidebar userData={userData} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <CurrentBookCard
                book={currentBook}
                onViewTracking={handleViewTracking}
                onSetAvailable={handleSetAvailable}
              />
              <ProfileMainContent
                userData={userData}
                myBooks={myBooks}
                exchangeHistory={exchangeHistory}
                badges={badges}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
