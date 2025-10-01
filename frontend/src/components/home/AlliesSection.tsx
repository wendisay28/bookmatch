import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { LocalCafe, MenuBook, Business, Place } from '@mui/icons-material';

interface Ally {
  id: number;
  name: string;
  type: string;
  offer: string;
  icon: 'cafe' | 'bookstore' | 'coworking';
}

const iconMap = {
  cafe: LocalCafe,
  bookstore: MenuBook,
  coworking: Business,
};

const AlliesSection = () => {
  const allies: Ally[] = [
    { id: 1, name: 'Café Literario El Péndulo', type: 'Cafetería', offer: '20% en bebidas y postres', icon: 'cafe' },
    { id: 2, name: 'Librería El Ateneo', type: 'Librería', offer: '10% de descuento en libros nuevos', icon: 'bookstore' },
    { id: 3, name: 'Co-working La Nube', type: 'Coworking', offer: 'Primera hora gratis en sala de reuniones', icon: 'coworking' },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Sitios Aliados
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Disfruta beneficios exclusivos presentando tu perfil TFT Club
      </Typography>

      <Grid container spacing={2}>
        {allies.map((ally) => {
          const IconComponent = iconMap[ally.icon];
          return (
            <Grid item xs={12} sm={6} md={4} key={ally.id}>
              <Card
                elevation={2}
                sx={{
                  borderLeft: 4,
                  borderColor: 'warning.main',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconComponent sx={{ fontSize: 28, color: 'warning.main' }} />
                      <Typography variant="h6" fontWeight="bold">
                        {ally.name}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'warning.light',
                        '&:hover': { bgcolor: 'warning.main', color: 'white' },
                      }}
                    >
                      <Place fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="warning.main" fontWeight="600" display="block" sx={{ mb: 1 }}>
                    {ally.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Beneficio:</strong> {ally.offer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AlliesSection;
