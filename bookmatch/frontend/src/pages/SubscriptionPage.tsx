import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import {
  ArrowBack,
  Check as CheckIcon,
  WorkspacePremium as PremiumIcon,
  AutoStories,
  Event,
  Language,
  LocalCafe,
  Create,
  People,
  Museum,
  Recommend,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const freemiumFeatures = [
    { icon: <AutoStories />, text: 'Uso de la plataforma' },
    { icon: <Recommend />, text: 'Recomendaciones personalizadas' },
  ];

  const premiumFeatures = [
    { icon: <Event />, text: 'Invitaciones a talleres exclusivos' },
    { icon: <AutoStories />, text: 'Un libro mensual gratis' },
    { icon: <People />, text: 'Intercambios culturales' },
    { icon: <Language />, text: 'Intercambios de idioma' },
    { icon: <LocalCafe />, text: '20% de descuento en cafés literarios' },
    { icon: <Create />, text: 'Firma de libros con autores' },
    { icon: <People />, text: 'Encuentros con autores' },
    { icon: <Museum />, text: 'Entradas gratis en sitios culturales aliados' },
  ];

  const isCurrentPlan = (plan: 'freemium' | 'premium') => {
    if (plan === 'premium') {
      return user?.subscriptionStatus === 'active';
    }
    return user?.subscriptionStatus !== 'active';
  };

  const handleUpgrade = () => {
    console.log('Actualizar a Premium');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Planes de Suscripción
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Elige el plan que mejor se adapte a tus necesidades
            </Typography>
          </Box>
        </Box>

        {/* Plan Cards */}
        <Grid container spacing={4}>
          {/* Freemium Plan */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={isCurrentPlan('freemium') ? 4 : 2}
              sx={{
                height: '100%',
                borderRadius: 3,
                position: 'relative',
                border: isCurrentPlan('freemium') ? '2px solid #2e6ff2' : '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              {isCurrentPlan('freemium') && (
                <Chip
                  label="Plan Actual"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: '#2e6ff2',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              )}

              <CardContent sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <AutoStories sx={{ fontSize: 48, color: '#2e6ff2', mb: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Freemium
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    Gratis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Para siempre
                  </Typography>
                </Box>

                <List>
                  {freemiumFeatures.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: '#2e6ff2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                          }}
                        >
                          <CheckIcon fontSize="small" />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  size="medium"
                  variant={isCurrentPlan('freemium') ? 'outlined' : 'contained'}
                  disabled={isCurrentPlan('freemium')}
                  sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
                >
                  {isCurrentPlan('freemium') ? 'Plan Actual' : 'Seleccionar'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Premium Plan */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={isCurrentPlan('premium') ? 4 : 2}
              sx={{
                height: '100%',
                borderRadius: 3,
                position: 'relative',
                border: isCurrentPlan('premium') ? '2px solid #53f682' : '1px solid #e0e0e0',
                background: isCurrentPlan('premium')
                  ? 'linear-gradient(135deg, rgba(83, 246, 130, 0.05) 0%, rgba(83, 246, 130, 0.1) 100%)'
                  : 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              {isCurrentPlan('premium') && (
                <Chip
                  label="Plan Actual"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: '#53f682',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}

              <CardContent sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <PremiumIcon sx={{ fontSize: 48, color: '#53f682', mb: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Premium
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      color: '#fff',
                      background: 'linear-gradient(135deg, #53f682 0%, #2ecc71 100%)',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      display: 'inline-block',
                    }}
                  >
                    $89.000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    por mes
                  </Typography>
                </Box>

                <Paper
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(83, 246, 130, 0.08) 0%, rgba(83, 246, 130, 0.15) 100%)',
                    border: '1px solid rgba(83, 246, 130, 0.3)',
                  }}
                >
                  <Typography variant="body2" fontWeight={600} color="text.primary" gutterBottom>
                    Todo lo de Freemium, más:
                  </Typography>
                </Paper>

                <List>
                  {premiumFeatures.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #53f682 0%, #2ecc71 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                          }}
                        >
                          <CheckIcon fontSize="small" />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  disabled={isCurrentPlan('premium')}
                  onClick={handleUpgrade}
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                    background: isCurrentPlan('premium')
                      ? 'linear-gradient(135deg, #cccccc 0%, #999999 100%)'
                      : 'linear-gradient(135deg, #53f682 0%, #2ecc71 100%)',
                    color: 'white',
                    '&:hover': {
                      background: isCurrentPlan('premium')
                        ? 'linear-gradient(135deg, #cccccc 0%, #999999 100%)'
                        : 'linear-gradient(135deg, #2ecc71 0%, #53f682 100%)',
                    },
                  }}
                >
                  {isCurrentPlan('premium') ? 'Plan Actual' : 'Actualizar a Premium'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Info */}
        <Paper sx={{ mt: 4, p: 3, borderRadius: 3, bgcolor: 'rgba(46, 111, 242, 0.05)' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ¿Por qué Premium?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Con el plan Premium, obtienes acceso ilimitado a eventos culturales exclusivos, talleres
            con autores reconocidos, y beneficios únicos en nuestra red de cafés literarios y sitios
            culturales aliados. Además, recibirás un libro seleccionado cada mes y tendrás prioridad
            en todos los intercambios.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cancela cuando quieras, sin compromisos a largo plazo.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SubscriptionPage;
