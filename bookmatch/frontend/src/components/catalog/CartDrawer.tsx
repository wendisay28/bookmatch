import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as CartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import { CartItem } from '../../types/catalog';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, delta: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  formatPrice: (price: number) => string;
}

const CartDrawer = ({
  open,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  getTotalItems,
  getTotalPrice,
  formatPrice,
}: CartDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } } }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          Carrito ({getTotalItems()})
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {cart.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <CartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography color="text.secondary">
            Tu carrito está vacío
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {cart.map((item) => (
              <ListItem key={item.book.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.book.coverUrl}
                    alt={item.book.title}
                    sx={{ width: 60, height: 90, objectFit: 'cover', borderRadius: 1 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {item.book.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.book.author}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main" sx={{ mt: 0.5 }}>
                      {formatPrice(item.book.price)}
                    </Typography>
                  </Box>
                  <IconButton size="small" onClick={() => onRemoveFromCart(item.book.id)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(item.book.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 'bold' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(item.book.id, 1)}
                    disabled={item.quantity >= item.book.stock}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                    Subtotal: {formatPrice(item.book.price * item.quantity)}
                  </Typography>
                </Box>
                <Divider sx={{ width: '100%', mt: 2 }} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ p: 2, borderTop: 2, borderColor: 'divider' }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography fontWeight="bold">{formatPrice(getTotalPrice())}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Envío:</Typography>
                <Typography fontWeight="bold">Gratis</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">Total:</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {formatPrice(getTotalPrice())}
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShippingIcon />}
              sx={{
                background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e5fd8 0%, #43d672 100%)',
                },
                mb: 1,
              }}
              onClick={() => alert('Función de pago en desarrollo')}
            >
              Proceder al Pago
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
              Cada libro incluye código TFT único y ficha de firmas
            </Typography>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
