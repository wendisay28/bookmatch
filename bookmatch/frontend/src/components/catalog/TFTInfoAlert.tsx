import { Alert, Button } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface TFTInfoAlertProps {
  onMoreInfo: () => void;
}

const TFTInfoAlert = ({ onMoreInfo }: TFTInfoAlertProps) => {
  return (
    <Alert
      severity="info"
      icon={<InfoIcon />}
      action={
        <Button color="inherit" size="small" onClick={onMoreInfo}>
          Más Info
        </Button>
      }
      sx={{ mb: 3 }}
    >
      <strong>¿Qué es TFT?</strong> Cada libro incluye un código único TFT y una ficha física para que los lectores dejen sus firmas durante el viaje.
    </Alert>
  );
};

export default TFTInfoAlert;
