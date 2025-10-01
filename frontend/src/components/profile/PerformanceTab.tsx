import { Card, CardContent, Grid, Typography } from '@mui/material';

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
      <Card variant="outlined" sx={{ bgcolor: 'warning.light' }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{userData.readerLevel}</Typography>
          <Typography variant="body2" color="text.secondary">Nivel Lector</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card variant="outlined" sx={{ bgcolor: 'primary.light' }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{userData.booksLinked}</Typography>
          <Typography variant="body2" color="text.secondary">Libros Vinculados</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card variant="outlined" sx={{ bgcolor: 'success.light' }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{userData.totalExchanges}</Typography>
          <Typography variant="body2" color="text.secondary">Intercambios</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card variant="outlined" sx={{ bgcolor: 'info.light' }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{userData.eventsAttended}</Typography>
          <Typography variant="body2" color="text.secondary">Eventos Asistidos</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);
