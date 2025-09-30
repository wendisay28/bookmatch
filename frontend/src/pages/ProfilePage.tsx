import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Box, Avatar, Button, Paper } from '@mui/material';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Avatar 
            src={user?.avatar} 
            sx={{ width: 100, height: 100, margin: '0 auto 20px' }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            {user?.name || 'Perfil'}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 2, textAlign: 'left' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">Información Personal</Typography>
              <Typography>Email: {user?.email}</Typography>
              {user?.walletAddress && (
                <Typography>
                  Wallet: {user.walletAddress.length <= 10 ? user.walletAddress : `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`}
                </Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">Suscripción</Typography>
              <Typography>
                Estado: {user?.subscriptionStatus === 'active' ? 'Activa' : 'Inactiva'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => alert(user?.subscriptionStatus === 'active' ? 'Funcionalidad para administrar suscripción no implementada aún.' : 'Funcionalidad para activar suscripción no implementada aún.')}
              >
                {user?.subscriptionStatus === 'active' ? 'Administrar suscripción' : 'Activar suscripción'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
