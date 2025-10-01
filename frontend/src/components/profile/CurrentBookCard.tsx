import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { MenuBook, TrendingUp, Settings } from '@mui/icons-material';

interface CurrentBookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    code: string;
    daysHeld: number;
    img: string;
  };
  onViewTracking: () => void;
  onSetAvailable: () => void;
}

export const CurrentBookCard = ({ book, onViewTracking, onSetAvailable }: CurrentBookCardProps) => (
  <Card
    elevation={3}
    sx={{
      borderLeft: 4,
      borderColor: 'primary.main',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          <MenuBook sx={{ fontSize: 20, verticalAlign: 'middle', mr: 1 }} />
          Mi Libro Actual
        </Typography>
        <Chip
          label="LEYENDO"
          color="primary"
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box
          component="img"
          src={book.img}
          alt={book.title}
          sx={{
            width: 80,
            height: 120,
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow: 2,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>
          <Box
            sx={{
              mt: 1,
              p: 1,
              bgcolor: 'grey.100',
              borderRadius: 1,
              fontFamily: 'monospace',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Código TFT:
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {book.code}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Chip
              icon={<TrendingUp fontSize="small" />}
              label={`${book.daysHeld} días en tu poder`}
              size="small"
              color="info"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          fullWidth
          variant="contained"
          onClick={onViewTracking}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Ver Trazabilidad
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={onSetAvailable}
          startIcon={<Settings />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          ¡Poner Disponible!
        </Button>
      </Stack>
    </CardContent>
  </Card>
);
