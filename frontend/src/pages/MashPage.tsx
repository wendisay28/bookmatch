import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, Paper, Grid,
  Alert, IconButton, Snackbar, Modal, RadioGroup,
  FormControlLabel, Radio, TextField, Chip, AlertColor
} from '@mui/material';
import {
  Book, ListAlt, Repeat, CheckCircle, Info, Close,
  Check, Mail, Visibility, Settings
} from '@mui/icons-material';

// --- INTERFACES ---

interface Book {
  id: number;
  title: string;
  author: string;
  receivedDate: string;
  daysHeld: number;
  code: string;
  img: string;
  isAvailable: boolean;
  availableDate: string | null;
}

interface ContributedBook {
  id: number;
  title: string;
  author: string;
  code: string;
  exchanges: number;
  cities: string[];
  avgTime: number;
  current: string;
  img: string;
}

interface ReceivedRequest {
  id: number;
  bookTitle: string;
  bookCode: string;
  fromUser: string;
  requestDate: string;
  bookId: number;
}

interface SentRequest {
  id: number;
  bookTitle: string;
  bookCode: string;
  toUser: string;
  status: string;
}

interface AlertConfig {
  type: AlertColor;
  message: string;
}

interface HoldingTabProps {
  list: Book[];
  openAvailabilityModal: (bookId: number, title?: string, isAvailable?: boolean) => void;
  showCustomAlert: (type: AlertColor, message: string) => void;
}

interface ContributedTabProps {
  list: ContributedBook[];
  showCustomAlert: (type: AlertColor, message: string) => void;
}

interface ExchangeTabProps {
  received: ReceivedRequest[];
  sent: SentRequest[];
  showCustomAlert: (type: AlertColor, message: string) => void;
}

interface CustomAlertProps {
  open: boolean;
  handleClose: () => void;
  alert: AlertConfig | null;
}

interface AvailabilityModalProps {
  open: boolean;
  handleClose: () => void;
  book: Book | null;
  setAvailability: (bookId: number, isAvailable: boolean, availableDate: string | null) => void;
  showCustomAlert: (type: AlertColor, message: string) => void;
}

// --- DATOS DE SIMULACIÓN (Reemplazan la data del script) ---

const initialHoldingList: Book[] = [
  { id: 501, title: 'El arte de la guerra', author: 'Sun Tzu', receivedDate: '2025-09-15', daysHeld: 45, code: 'TFT-777T', img: 'https://placehold.co/100x150/14B8A6/ffffff?text=ACTUAL', isAvailable: false, availableDate: null },
  { id: 502, title: 'La sombra del viento', author: 'C.R. Zafón', receivedDate: '2025-08-01', daysHeld: 60, code: 'TFT-345F', img: 'https://placehold.co/100x150/CA8A04/000000?text=CRZ', isAvailable: true, availableDate: null },
];

const myBooksList: ContributedBook[] = [
  { id: 101, title: 'Cien años de soledad', author: 'GGM', code: 'TFT-001A', exchanges: 4, cities: ['BOG', 'MED', 'CAL'], avgTime: 8, current: 'Laura V.', img: 'https://placehold.co/100x150/5B21B6/ffffff?text=GGM' },
  { id: 102, title: 'El laberinto de la soledad', author: 'Octavio Paz', code: 'TFT-002B', exchanges: 2, cities: ['BOG', 'MEX'], avgTime: 10, current: 'Carlos J.', img: 'https://placehold.co/100x150/CA8A04/ffffff?text=OP' },
  { id: 103, title: 'Rayuela', author: 'Julio Cortázar', code: 'TFT-003C', exchanges: 7, cities: ['BOG', 'CDMX', 'MAD'], avgTime: 5, current: 'María S.', img: 'https://placehold.co/100x150/6D28D9/ffffff?text=JC' },
];

const receivedRequests: ReceivedRequest[] = [
  { id: 10, bookTitle: 'El arte de la guerra', bookCode: 'TFT-777T', fromUser: 'Ricardo G.', requestDate: '2025-09-29', bookId: 501 },
];

const sentRequests: SentRequest[] = [
  { id: 20, bookTitle: '1984', bookCode: 'TFT-123X', toUser: 'Elena M.', status: 'Pendiente' },
  { id: 21, bookTitle: 'Drácula', bookCode: 'TFT-789G', toUser: 'Ana R.', status: 'Aceptada' },
];

// Estilo del modal (para centrarlo)
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

// --- Sub-Componentes (Pestañas) ---

// Pestaña 1: Libros en mi poder
const HoldingTab: React.FC<HoldingTabProps> = ({ list, openAvailabilityModal, showCustomAlert }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {list.length === 0 ? (
      <Paper elevation={1} sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        No tienes ningún libro en tu poder en este momento.
      </Paper>
    ) : (
      list.map(book => (
        <Paper key={book.id} elevation={3} sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start', gap: 2 }}>
          <Box
            component="img"
            src={book.img}
            alt={book.title}
            sx={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 1, boxShadow: 1, alignSelf: { xs: 'center', sm: 'flex-start' } }}
          />
          <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                {book.title}
              </Typography>
              <Chip label={book.code} size="small" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', color: 'grey.600' }} />
            </Box>
            <Typography variant="body2" color="text.secondary">{book.author}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Box component="span" sx={{ fontWeight: 'medium' }}>En tu poder por:</Box>
              <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main', ml: 0.5 }}>{book.daysHeld} días</Box>
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                icon={book.isAvailable ? <Check fontSize="small" /> : <Info fontSize="small" />}
                label={book.isAvailable ? 'Disponible para Intercambio' : 'No Disponible'}
                size="small"
                sx={{
                  bgcolor: book.isAvailable ? 'success.light' : 'warning.light',
                  color: book.isAvailable ? 'success.dark' : 'warning.dark',
                  fontWeight: 'semibold'
                }}
              />
            </Box>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 180 }, display: 'flex', flexDirection: 'column', gap: 1, alignSelf: 'stretch' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => showCustomAlert('info', `Mostrando trazabilidad para ${book.code}`)}
              startIcon={<Visibility />}
            >
              Ver Trazabilidad
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => openAvailabilityModal(book.id, book.title, book.isAvailable)}
              startIcon={<Settings />}
            >
              {book.isAvailable ? 'Ajustar' : '¡Poner Disponible!'}
            </Button>
          </Box>
        </Paper>
      ))
    )}
  </Box>
);

// Pestaña 2: Libros Aportados al club
const ContributedTab: React.FC<ContributedTabProps> = ({ list, showCustomAlert }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {list.length === 0 ? (
      <Paper elevation={1} sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        Aún no has aportado libros al club.
      </Paper>
    ) : (
      list.map(book => (
        <Paper key={book.id} elevation={3} sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start', gap: 2 }}>
          <Box
            component="img"
            src={book.img}
            alt={book.title}
            sx={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 1, boxShadow: 1, alignSelf: { xs: 'center', sm: 'flex-start' } }}
          />
          <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                {book.title}
              </Typography>
              <Chip label={book.code} size="small" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', color: 'grey.600' }} />
            </Box>
            <Typography variant="body2" color="text.secondary">Aportado por ti</Typography>

            <Grid container spacing={1} sx={{ mt: 1, fontSize: '0.875rem' }}>
              <Grid item xs={6}>
                <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Intercambios:</Box> <Box component="span" sx={{ fontWeight: 'bold' }}>{book.exchanges}</Box></Box>
              </Grid>
              <Grid item xs={6}>
                <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Ciudades:</Box> <Box component="span" sx={{ fontWeight: 'bold' }}>{book.cities.join(', ')}</Box></Box>
              </Grid>
              <Grid item xs={6}>
                <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Lector Actual:</Box> <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{book.current}</Box></Box>
              </Grid>
              <Grid item xs={6}>
                <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Lectura Promedio:</Box> <Box component="span" sx={{ fontWeight: 'bold' }}>{book.avgTime} días</Box></Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 200 }, display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => showCustomAlert('info', `Mostrando Ruta TFT completa para ${book.code}`)}
              sx={{ width: '100%' }}
            >
              Ver Ruta TFT Completa
            </Button>
          </Box>
        </Paper>
      ))
    )}
  </Box>
);

// Pestaña 3: Intercambios
const ExchangeTab: React.FC<ExchangeTabProps> = ({ received, sent, showCustomAlert }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {/* Solicitudes Recibidas */}
    <Box>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, borderLeft: 4, borderColor: 'primary.main', pl: 2 }}>
        Solicitudes Recibidas
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {received.length > 0 ? received.map(req => (
          <Paper key={req.id} elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 'semibold' }}>
                {req.bookTitle} <Box component="span" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'grey.500' }}>{req.bookCode}</Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Solicitud de: <Box component="span" sx={{ fontWeight: 'medium', color: 'primary.main' }}>{req.fromUser}</Box>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="success" onClick={() => showCustomAlert('success', `Solicitud para ${req.bookTitle} ACEPTADA.`)}>
                <CheckCircle />
              </IconButton>
              <IconButton color="error" onClick={() => showCustomAlert('error', `Solicitud para ${req.bookTitle} RECHAZADA.`)}>
                <Close />
              </IconButton>
            </Box>
          </Paper>
        )) : (
          <Paper elevation={1} sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            No tienes solicitudes recibidas.
          </Paper>
        )}
      </Box>
    </Box>

    {/* Solicitudes Enviadas */}
    <Box>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, borderLeft: 4, borderColor: 'primary.main', pl: 2 }}>
        Solicitudes Enviadas
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sent.length > 0 ? sent.map(req => (
          <Paper key={req.id} elevation={3} sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 'semibold' }}>
              {req.bookTitle} <Box component="span" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'grey.500' }}>{req.bookCode}</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Solicitado a: <Box component="span" sx={{ fontWeight: 'medium', color: 'primary.main' }}>{req.toUser}</Box>
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip
                label={req.status}
                size="small"
                icon={req.status === 'Pendiente' ? <Info fontSize="small" /> : <Check fontSize="small" />}
                sx={{
                  bgcolor: req.status === 'Pendiente' ? 'warning.light' : 'success.light',
                  color: req.status === 'Pendiente' ? 'warning.dark' : 'success.dark',
                  fontWeight: 'semibold'
                }}
              />
              <IconButton color="primary" onClick={() => showCustomAlert('info', `Mensaje enviado a ${req.toUser}`)}>
                <Mail />
              </IconButton>
            </Box>
          </Paper>
        )) : (
          <Paper elevation={1} sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            No has enviado ninguna solicitud.
          </Paper>
        )}
      </Box>
    </Box>
  </Box>
);

// --- Componente de Alerta Personalizada (Snackbar) ---

const CustomAlert: React.FC<CustomAlertProps> = ({ open, handleClose, alert }) => {
  if (!alert) return null;

  let severity: AlertColor = 'info';
  let Icon = Info;
  switch (alert.type) {
    case 'success': severity = 'success'; Icon = CheckCircle; break;
    case 'error': severity = 'error'; Icon = Close; break;
    default: severity = 'info'; Icon = Info; break;
  }

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={severity}
        sx={{ width: '100%', alignItems: 'center' }}
        icon={<Icon fontSize="inherit" />}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

// --- Componente de Modal de Disponibilidad ---

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ open, handleClose, book, setAvailability, showCustomAlert }) => {
  const [availabilityOption, setAvailabilityOption] = useState('now');
  const [availableDate, setAvailableDate] = useState('');

  // Sincronizar estado del modal con el libro actual
  useEffect(() => {
    if (book) {
      setAvailabilityOption(book.isAvailable ? 'now' : (book.availableDate ? 'date' : 'now'));
      setAvailableDate(book.availableDate || '');
    }
  }, [book]);

  const handleConfirm = () => {
    if (!book) return;
    
    let newIsAvailable = false;
    let newAvailableDate = null;

    if (availabilityOption === 'now') {
      newIsAvailable = true;
      showCustomAlert('success', `${book.title} ahora está disponible.`);
    } else if (availabilityOption === 'date') {
      if (!availableDate) {
        showCustomAlert('error', 'Por favor, selecciona una fecha.');
        return;
      }
      newIsAvailable = false;
      newAvailableDate = availableDate;
      showCustomAlert('success', `${book.title} estará disponible el ${availableDate}.`);
    }

    setAvailability(book.id, newIsAvailable, newAvailableDate);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'grey.800' }}>
          Configurar Disponibilidad
        </Typography>
        <Typography id="modal-book-title" variant="h6" sx={{ fontWeight: 'semibold', mb: 3, color: 'primary.main' }}>
          {book?.title}
        </Typography>

        <RadioGroup
          aria-label="availability"
          name="availability-option"
          value={availabilityOption}
          onChange={(e) => setAvailabilityOption(e.target.value)}
        >
          <Paper elevation={0} sx={{ p: 2, mb: 1.5, border: 1, borderColor: availabilityOption === 'now' ? 'success.main' : 'grey.300', '&:hover': { bgcolor: 'green.50', cursor: 'pointer' } }}>
            <FormControlLabel
              value="now"
              control={<Radio color="success" />}
              label={<Typography fontWeight="medium">Disponible para Intercambio Ahora</Typography>}
              sx={{ '& .MuiRadio-root': { color: 'success.main' } }}
            />
          </Paper>

          <Paper elevation={0} sx={{ p: 2, mb: 3, border: 1, borderColor: availabilityOption === 'date' ? 'warning.main' : 'grey.300', '&:hover': { bgcolor: 'warning.50', cursor: 'pointer' } }}>
            <FormControlLabel
              value="date"
              control={<Radio color="warning" />}
              label={<Typography fontWeight="medium">Disponible a Partir de:</Typography>}
              sx={{ mb: 1, '& .MuiRadio-root': { color: 'warning.main' } }}
            />
            <TextField
              type="date"
              fullWidth
              size="small"
              value={availableDate}
              onChange={(e) => setAvailableDate(e.target.value)}
              disabled={availabilityOption !== 'date'}
              sx={{ mt: 1 }}
              InputLabelProps={{ shrink: true }}
            />
          </Paper>
        </RadioGroup>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  );
};


// --- Componente Principal ---

export default function MyBooksApp() {
  const [activeTab, setActiveTab] = useState('holding');
  const [holdingList, setHoldingList] = useState<Book[]>(initialHoldingList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookForModal, setCurrentBookForModal] = useState<Book | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);


  // Lógica para mostrar las alertas (Snackbar)
  const showCustomAlert = (type: AlertColor, message: string) => {
    setAlertConfig({ type, message });
    setAlertOpen(true);
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  // Lógica para el modal de disponibilidad
  const openAvailabilityModal = (bookId: number) => {
    const book = holdingList.find(b => b.id === bookId);
    if (book) {
      setCurrentBookForModal(book);
      setIsModalOpen(true);
    }
  };

  const closeAvailabilityModal = () => {
    setIsModalOpen(false);
    setCurrentBookForModal(null);
  };

  // Lógica para actualizar la disponibilidad del libro
  const setBookAvailability = (bookId: number, isAvailable: boolean, availableDate: string | null) => {
    setHoldingList(prevList =>
      prevList.map(book =>
        book.id === bookId
          ? { ...book, isAvailable, availableDate }
          : book
      )
    );
  };

  // Definición de los botones de pestaña
  const tabs = [
    { name: 'holding', label: 'En mi poder', icon: Book },
    { name: 'contributed', label: 'Aportados al club', icon: ListAlt },
    { name: 'exchange', label: 'Intercambios', icon: Repeat },
  ];

  // Renderizado del contenido de la pestaña activa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'holding':
        return <HoldingTab list={holdingList} openAvailabilityModal={openAvailabilityModal} showCustomAlert={showCustomAlert} />;
      case 'contributed':
        return <ContributedTab list={myBooksList} showCustomAlert={showCustomAlert} />;
      case 'exchange':
        return <ExchangeTab received={receivedRequests} sent={sentRequests} showCustomAlert={showCustomAlert} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: '800', borderBottom: 1, borderColor: 'grey.300', pb: 1.5, color: 'grey.900' }}>
        Mis Libros (TFT Tracker)
      </Typography>

      {/* Control de Pestañas (Tabs) */}
      <Paper elevation={4} sx={{ mb: 4, p: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: '12px' }}>
        {tabs.map((tab, index) => (
          <Button
            key={tab.name}
            startIcon={<tab.icon />}
            onClick={() => setActiveTab(tab.name)}
            sx={{
              flexGrow: 1,
              py: 1.5,
              fontSize: '0.875rem',
              fontWeight: '600',
              borderRadius: index === 0 ? { xs: '12px 12px 0 0', md: '12px 0 0 12px' } : (index === tabs.length - 1 ? { xs: '0 0 12px 12px', md: '0 12px 12px 0' } : '0'),
              bgcolor: activeTab === tab.name ? 'primary.50' : 'transparent', // Custom color si es necesario o usa theme.palette.action.hover
              color: activeTab === tab.name ? 'primary.main' : 'text.secondary',
              '&:hover': {
                bgcolor: activeTab === tab.name ? 'primary.100' : 'grey.100',
              },
              borderRight: { xs: 0, md: index < tabs.length - 1 ? '1px solid' : 0 },
              borderBottom: { xs: index < tabs.length - 1 ? '1px solid' : 0, md: 0 },
              borderColor: 'grey.200',
              transition: 'background-color 0.15s, color 0.15s'
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Paper>

      {/* Contenido de las Pestañas */}
      <Box id="mybooks-content-area" sx={{ mt: 3 }}>
        {renderTabContent()}
      </Box>

      {/* Modal y Alertas (Fuera del flujo principal) */}
      <AvailabilityModal
        open={isModalOpen}
        handleClose={closeAvailabilityModal}
        book={currentBookForModal}
        setAvailability={setBookAvailability}
        showCustomAlert={showCustomAlert}
      />
      <CustomAlert open={alertOpen} handleClose={handleAlertClose} alert={alertConfig} />
    </Container>
  );
}

/* * Para usar este componente, lo importarías y renderizarías en tu App.js o donde corresponda:
*
* // En App.js
* import MyBooksApp from './MyBooksApp';
* function App() {
* return <MyBooksApp />;
* }
* export default App;
*
*/
