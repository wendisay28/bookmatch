import { Box, Button, Card, CardContent, Chip, Stack, Typography, Skeleton, Divider } from '@mui/material';
import { MenuBook, TrendingUp, Settings, Search, CheckCircle } from '@mui/icons-material';
import { memo } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  code: string;
  daysHeld: number;
  img: string;
}

interface CurrentBookCardProps {
  book: Book;
  onViewTracking: () => void;
  onSetAvailable: () => void;
  loading?: boolean;
  isProcessing?: boolean;
}

const styles = {
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'none !important',
    '&:hover': {
      transform: 'none !important',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    },
    '& *': {
      transition: 'none !important',
    },
  },
  cardContent: {
    pt: 3,
    pb: 3,
    '&:last-child': {
      pb: 3,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  statusChip: {
    fontWeight: 500,
    bgcolor: '#e8f5e9',
    color: '#2e7d32',
    border: 'none',
    transition: 'none !important',
    '& .MuiChip-icon': {
      color: '#2e7d32',
    },
    '&:hover': {
      transform: 'none !important',
    },
  },
  bookImage: {
    width: { xs: '100%', sm: 140 },
    height: { xs: 200, sm: 180 },
    objectFit: 'cover',
    borderRadius: 2,
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
    transition: 'none !important',
    '&:hover': {
      transform: 'none !important',
    },
  },
  codeBox: {
    mt: 2,
    p: 2,
    bgcolor: '#fafafa',
    borderRadius: 2,
    border: '1px dashed #ccc',
  },
  trackingCode: {
    color: '#1565c0',
    fontFamily: 'monospace',
    letterSpacing: 1,
    fontSize: '1rem',
    fontWeight: 700,
  },
  daysChip: {
    fontWeight: 600,
    bgcolor: '#f0f4ff',
    color: '#1a237e',
    transition: 'none !important',
    '& .MuiChip-icon': {
      color: '#1a237e',
    },
    '&:hover': {
      transform: 'none !important',
    },
  },
  primaryButton: {
    textTransform: 'none',
    fontWeight: 600,
    py: 1.3,
    borderRadius: 2,
    bgcolor: '#1565c0',
    color: 'white',
    transition: 'none !important',
    '&:hover': {
      bgcolor: '#0d47a1',
      transform: 'none !important',
      boxShadow: 'none',
    },
  },
  secondaryButton: {
    textTransform: 'none',
    fontWeight: 600,
    py: 1.3,
    borderRadius: 2,
    borderColor: '#ccc',
    color: '#555',
    transition: 'none !important',
    '&:hover': {
      borderColor: '#1565c0',
      bgcolor: '#f4f6f8',
      transform: 'none !important',
    },
  },
} as const;

export const CurrentBookCard = memo(({ 
  book, 
  onViewTracking, 
  onSetAvailable,
  loading = false,
  isProcessing = false,
}: CurrentBookCardProps) => {
  if (loading) {
    return (
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Skeleton variant="text" width={200} height={32} />
          <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
            <Skeleton variant="rectangular" width={140} height={180} sx={{ borderRadius: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 2, borderRadius: 2 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.header}>
          <Box sx={styles.titleContainer}>
            <MenuBook sx={{ fontSize: 22, color: 'text.secondary' }} />
            <Typography variant="h6" fontWeight={700} component="h2">
              Leyendo Ahora
            </Typography>
          </Box>
          <Chip
            icon={<CheckCircle sx={{ fontSize: 18 }} />}
            label="Activo"
            size="small"
            sx={styles.statusChip}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box 
          sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 4 }, 
            mb: 3, 
            flexDirection: { xs: 'column', sm: 'row' } 
          }}
        >
          <Box
            component="img"
            src={book.img}
            alt={`Portada del libro ${book.title}`}
            loading="lazy"
            sx={styles.bookImage}
          />
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {book.title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {book.author}
            </Typography>
            
            <Box sx={styles.codeBox}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Código de Seguimiento:
              </Typography>
              <Typography variant="body1" sx={styles.trackingCode}>
                {book.code}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Chip
                icon={<TrendingUp fontSize="small" />}
                label={`${book.daysHeld} día${book.daysHeld !== 1 ? 's' : ''} contigo`}
                size="medium"
                sx={styles.daysChip}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={onViewTracking}
            startIcon={<Search />}
            sx={styles.primaryButton}
            disabled={isProcessing}
          >
            Ver Trazabilidad
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            onClick={onSetAvailable}
            startIcon={<Settings />}
            sx={styles.secondaryButton}
            disabled={isProcessing}
          >
            Poner Disponible
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
});

CurrentBookCard.displayName = 'CurrentBookCard';
