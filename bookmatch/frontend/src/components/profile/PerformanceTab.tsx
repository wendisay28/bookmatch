import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { EmojiEvents, MenuBook, Repeat, Event } from '@mui/icons-material';

interface PerformanceTabProps {
  userData: {
    readerLevel: number;
    booksLinked: number;
    totalExchanges: number;
    eventsAttended: number;
  };
}

export const PerformanceTab = ({ userData }: PerformanceTabProps) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#2e6ff2',
          borderWidth: 1,
          transition: 'none !important',
          height: '100%',
          '&:hover': {
            borderColor: '#2e6ff2',
          }
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ mr: 2, position: 'relative', display: 'inline-block' }}>
              <EmojiEvents sx={{ fontSize: 36, color: '#2e6ff2' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: '#53f682',
                  color: 'white',
                  borderRadius: '50%',
                  minWidth: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  px: 0.5,
                  border: '2px solid white',
                }}
              >
                {userData.readerLevel}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333333' }}>
                Nivel Lector
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Tu nivel de lectura basado en actividad e intercambios
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#2e6ff2',
          borderWidth: 1,
          transition: 'none !important',
          height: '100%',
          '&:hover': {
            borderColor: '#2e6ff2',
          }
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ mr: 2, position: 'relative', display: 'inline-block' }}>
              <MenuBook sx={{ fontSize: 36, color: '#2e6ff2' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: '#53f682',
                  color: 'white',
                  borderRadius: '50%',
                  minWidth: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  px: 0.5,
                  border: '2px solid white',
                }}
              >
                {userData.booksLinked}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333333' }}>
                Libros Vinculados
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Total de libros que has registrado en Ruedelo
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#2e6ff2',
          borderWidth: 1,
          transition: 'none !important',
          height: '100%',
          '&:hover': {
            borderColor: '#2e6ff2',
          }
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ mr: 2, position: 'relative', display: 'inline-block' }}>
              <Repeat sx={{ fontSize: 36, color: '#2e6ff2' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: '#53f682',
                  color: 'white',
                  borderRadius: '50%',
                  minWidth: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  px: 0.5,
                  border: '2px solid white',
                }}
              >
                {userData.totalExchanges}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333333' }}>
                Intercambios
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Número de intercambios completados exitosamente
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#2e6ff2',
          borderWidth: 1,
          transition: 'none !important',
          height: '100%',
          '&:hover': {
            borderColor: '#2e6ff2',
          }
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ mr: 2, position: 'relative', display: 'inline-block' }}>
              <Event sx={{ fontSize: 36, color: '#2e6ff2' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: '#53f682',
                  color: 'white',
                  borderRadius: '50%',
                  minWidth: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  px: 0.5,
                  border: '2px solid white',
                }}
              >
                {userData.eventsAttended}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333333' }}>
                Eventos Asistidos
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Eventos literarios a los que has asistido
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);
