import { Box, Typography, IconButton, Badge } from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';

interface CatalogHeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const CatalogHeader = ({ cartItemsCount, onCartClick }: CatalogHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Box>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Catálogo TFT 📚
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compra libros nuevos y comienza su viaje en la red TFT
        </Typography>
      </Box>

      <IconButton
        color="primary"
        onClick={onCartClick}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' },
          width: 56,
          height: 56,
        }}
      >
        <Badge badgeContent={cartItemsCount} color="error">
          <CartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default CatalogHeader;
