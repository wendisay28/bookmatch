import { useState, useEffect } from 'react';
import { Box, Container, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileCover } from '../components/profile/ProfileCover';
import { ProfileSidebar } from '../components/profile/ProfileSidebar';
import { ProfileMainContent } from '../components/profile/ProfileMainContent';
import { CurrentBookCard } from '../components/profile/CurrentBookCard';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getUserBadges, checkAndAwardBadges, Badge } from '../services/badgeService';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));

        if (userDoc.exists()) {
          const data = userDoc.data();
          const userStats = {
            booksLinked: data.booksLinked || 0,
            totalExchanges: data.totalExchanges || 0,
            eventsAttended: data.eventsAttended || 0
          };

          setUserData({
            name: data.name || user.name,
            userId: data.username || user.id.substring(0, 12),
            memberSince: new Date(data.createdAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
            photoUrl: data.photoUrl || user.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            coverUrl: data.coverUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop",
            quote: data.quote || "No hay amigo más leal que un libro",
            readerLevel: data.readerLevel || 1,
            levelProgressPercent: 35,
            ...userStats
          });

          // Cargar insignias del usuario
          const userBadges = await getUserBadges(user.id);
          setBadges(userBadges);

          // Verificar y otorgar nuevas insignias
          const newBadges = await checkAndAwardBadges(user.id, userStats);
          if (newBadges && newBadges.length > 0) {
            console.log('¡Nuevas insignias obtenidas!', newBadges);
            // Recargar insignias
            const updatedBadges = await getUserBadges(user.id);
            setBadges(updatedBadges);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>No se pudo cargar el perfil</p>
      </Box>
    );
  }

  const myBooks = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', code: 'TFT-001A', exchanges: 4, current: 'Laura V.' },
    { id: 2, title: 'El laberinto de la soledad', author: 'Octavio Paz', code: 'TFT-002B', exchanges: 2, current: 'Carlos J.' },
    { id: 3, title: 'Rayuela', author: 'Julio Cortázar', code: 'TFT-003C', exchanges: 7, current: 'María S.' }
  ];

  // Las insignias ya vienen del estado

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
    img: 'https://placehold.co/100x150/14B8A6/ffffff?text=ACTUAL',
    startDate: '20 Ago 2025',
    nextReader: 'María González',
    recommendedDays: 60
  };

  const handleViewTracking = () => {
    navigate('/mash');
  };

  const handleSetAvailable = () => {
    console.log('Configurar disponibilidad del libro');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <ProfileCover coverUrl={userData.coverUrl} />

      <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -8 }, position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={3}>
            <ProfileSidebar userData={userData} />
          </Grid>

          <Grid item xs={12} md={9}>
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
