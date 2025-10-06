import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Verified as VerifiedIcon } from '@mui/icons-material';

interface TFTInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const TFTInfoDialog = ({ open, onClose }: TFTInfoDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
        <VerifiedIcon color="primary" />
        ¿Qué es el Sistema TFT?
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Typography paragraph>
            <strong>TFT (Traveling Free Tales)</strong> es nuestro sistema único de trazabilidad y comunidad literaria.
          </Typography>
          <Typography paragraph>
            <strong>Cada libro incluye:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              <Typography><strong>Código TFT único:</strong> Un identificador digital que permite rastrear el viaje del libro</Typography>
            </li>
            <li>
              <Typography><strong>Ficha física de firmas:</strong> Espacio para que cada lector deje su huella y ubicación</Typography>
            </li>
            <li>
              <Typography><strong>Trazabilidad completa:</strong> Ve por dónde ha viajado tu libro y quién lo ha leído</Typography>
            </li>
            <li>
              <Typography><strong>Red comunitaria:</strong> Conecta con otros lectores y forma parte de una comunidad</Typography>
            </li>
          </Box>
          <Typography paragraph sx={{ mt: 2 }}>
            Al comprar un libro, tú serás el <strong>primer lector oficial</strong> y podrás intercambiarlo con otros miembros cuando termines de leerlo.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TFTInfoDialog;
