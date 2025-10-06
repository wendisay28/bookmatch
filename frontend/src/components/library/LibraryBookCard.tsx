import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import {
  MenuBook as BookIcon,
  LocationOn as LocationIcon,
  SwapHoriz as ExchangeIcon,
  CheckCircle as AvailableIcon
} from '@mui/icons-material';
import { Book } from '../../services/matchService';

interface LibraryBookCardProps {
  book: Book;
  onRequest: (book: Book) => void;
}

export const LibraryBookCard = ({ book, onRequest }: LibraryBookCardProps) => (
  <Card
    elevation={2}
    sx={{
      borderLeft: 4,
      borderColor: 'primary.main',
      transition: 'all 0.2s',
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-2px)'
      }
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <Chip
              label={book.code}
              size="small"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                bgcolor: 'grey.100',
                color: 'grey.700'
              }}
            />
            <Chip
              icon={<AvailableIcon sx={{ fontSize: 14 }} />}
              label="Disponible"
              size="small"
              color="success"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {book.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <BookIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
            {book.author}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {book.totalExchanges > 0 && (
              <Chip
                icon={<ExchangeIcon sx={{ fontSize: 14 }} />}
                label={`${book.totalExchanges} intercambios`}
                size="small"
                variant="outlined"
              />
            )}
            {book.cities.length > 0 && (
              <Chip
                icon={<LocationIcon sx={{ fontSize: 14 }} />}
                label={book.cities.join(', ')}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        <Button
          variant="contained"
          size="medium"
          onClick={() => onRequest(book)}
          startIcon={<ExchangeIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
            },
            minWidth: 120
          }}
        >
          Solicitar
        </Button>
      </Box>
    </CardContent>
  </Card>
);
