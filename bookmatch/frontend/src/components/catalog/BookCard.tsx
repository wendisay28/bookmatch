import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import { CatalogBook } from '../../types/catalog';

interface BookCardProps {
  book: CatalogBook;
  onAddToCart: (book: CatalogBook) => void;
  formatPrice: (price: number) => string;
}

const BookCard = ({ book, onAddToCart, formatPrice }: BookCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={book.coverUrl}
        alt={book.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={book.genre}
          size="small"
          sx={{ mb: 1, bgcolor: 'primary.light', color: 'white', fontWeight: 600 }}
        />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem' }}>
          ISBN: {book.isbn}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {book.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            {formatPrice(book.price)}
          </Typography>
          <Chip
            label={`Stock: ${book.stock}`}
            size="small"
            color={book.stock > 10 ? 'success' : book.stock > 5 ? 'warning' : 'error'}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<CartIcon />}
          onClick={() => onAddToCart(book)}
          disabled={book.stock === 0}
          sx={{
            background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
            },
          }}
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
