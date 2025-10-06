import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, Paper, Grid,
  Alert, IconButton, Snackbar, Modal, RadioGroup,
  FormControlLabel, Radio, TextField, Chip, AlertColor,
  CircularProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, ImageList, ImageListItem, IconButton as MuiIconButton
} from '@mui/material';
import {
  Book, ListAlt, Repeat, CheckCircle, Info, Close,
  Check, Mail, Visibility, Settings,
  Add as AddIcon, PhotoCamera, Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import {
  getMyHoldingBooks,
  getMyContributedBooks,
  getReceivedRequests,
  getSentRequests,
  setBookAvailability as setBookAvailabilityService,
  acceptRequest as acceptRequestService,
  rejectRequest as rejectRequestService,
  HoldingBook,
  Book as BookType,
  ExchangeRequest
} from '../services/matchService';
import { contributeBook } from '../services/bookService';

// --- INTERFACES (adaptadas) ---

interface AlertConfig {
  type: AlertColor;
  message: string;
}

interface HoldingTabProps {
  list: HoldingBook[];
  openAvailabilityModal: (bookId: string, title?: string, isAvailable?: boolean) => void;
  showCustomAlert: (type: AlertColor, message: string) => void;
  onViewTraceability: (book: HoldingBook) => void;
}

interface ContributedTabProps {
  list: BookType[];
  showCustomAlert: (type: AlertColor, message: string) => void;
  getCurrentHolder: (bookId: string) => Promise<string>;
}

interface ExchangeTabProps {
  received: ExchangeRequest[];
  sent: ExchangeRequest[];
  showCustomAlert: (type: AlertColor, message: string) => void;
  onAcceptRequest: (requestId: string) => Promise<void>;
  onRejectRequest: (requestId: string) => Promise<void>;
}

interface CustomAlertProps {
  open: boolean;
  handleClose: () => void;
  alert: AlertConfig | null;
}

interface AvailabilityModalProps {
  open: boolean;
  handleClose: () => void;
  book: HoldingBook | null;
  setAvailability: (bookId: string, isAvailable: boolean, availableDate: string | null) => void;
  showCustomAlert: (type: AlertColor, message: string) => void;
}

// Los datos ahora se cargarán desde Firestore

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
const HoldingTab: React.FC<HoldingTabProps> = ({ list, openAvailabilityModal, onViewTraceability }) => (
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
            src={book.coverUrl}
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
              onClick={() => onViewTraceability(book)}
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
const ContributedTab: React.FC<ContributedTabProps> = ({ list, showCustomAlert, getCurrentHolder }) => {
  const [holderNames, setHolderNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadHolderNames = async () => {
      const names: Record<string, string> = {};
      for (const book of list) {
        names[book.id] = await getCurrentHolder(book.id);
      }
      setHolderNames(names);
    };
    loadHolderNames();
  }, [list, getCurrentHolder]);

  return (
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
              src={book.coverUrl}
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
                  <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Intercambios:</Box> <Box component="span" sx={{ fontWeight: 'bold' }}>{book.totalExchanges}</Box></Box>
                </Grid>
                <Grid item xs={6}>
                  <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Ciudades:</Box> <Box component="span" sx={{ fontWeight: 'bold' }}>{book.cities.join(', ') || 'N/A'}</Box></Box>
                </Grid>
                <Grid item xs={6}>
                  <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Lector Actual:</Box> <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{holderNames[book.id] || 'Cargando...'}</Box></Box>
                </Grid>
                <Grid item xs={6}>
                  <Box><Box component="span" sx={{ fontWeight: 'medium' }}>Lectura Promedio:</Box> <Box component="span" sx={{ fontWeight: 'bold' }}>{book.avgReadingTime} días</Box></Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 200 }, display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => showCustomAlert('info', `La ruta TFT completa se implementará con Polkadot para ${book.code}`)}
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
};

// Pestaña 3: Intercambios
const ExchangeTab: React.FC<ExchangeTabProps> = ({ received, sent, showCustomAlert, onAcceptRequest, onRejectRequest }) => (
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
                Solicitud de: <Box component="span" sx={{ fontWeight: 'medium', color: 'primary.main' }}>{req.fromUserName}</Box>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(req.requestDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="success" onClick={() => onAcceptRequest(req.id)}>
                <CheckCircle />
              </IconButton>
              <IconButton color="error" onClick={() => onRejectRequest(req.id)}>
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
              Solicitado a: <Box component="span" sx={{ fontWeight: 'medium', color: 'primary.main' }}>{req.toUserName}</Box>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(req.requestDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip
                label={req.status === 'pending' ? 'Pendiente' : req.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                size="small"
                icon={req.status === 'pending' ? <Info fontSize="small" /> : req.status === 'accepted' ? <Check fontSize="small" /> : <Close fontSize="small" />}
                sx={{
                  bgcolor: req.status === 'pending' ? 'warning.light' : req.status === 'accepted' ? 'success.light' : 'error.light',
                  color: req.status === 'pending' ? 'warning.dark' : req.status === 'accepted' ? 'success.dark' : 'error.dark',
                  fontWeight: 'semibold'
                }}
              />
              <IconButton color="primary" onClick={() => showCustomAlert('info', `Función de mensajería próximamente`)}>
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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('holding');
  const [loading, setLoading] = useState(true);
  const [holdingList, setHoldingList] = useState<HoldingBook[]>([]);
  const [contributedList, setContributedList] = useState<BookType[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<ExchangeRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ExchangeRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookForModal, setCurrentBookForModal] = useState<HoldingBook | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [addBookDialogOpen, setAddBookDialogOpen] = useState(false);
  const [newBookData, setNewBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    coverUrl: '',
    city: ''
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [addingBook, setAddingBook] = useState(false);
  const [traceabilityDialogOpen, setTraceabilityDialogOpen] = useState(false);
  const [selectedBookForTrace, setSelectedBookForTrace] = useState<HoldingBook | null>(null);

  // Cargar todos los datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Cargar datos en paralelo
        const [holding, contributed, received, sent] = await Promise.all([
          getMyHoldingBooks(user.id),
          getMyContributedBooks(user.id),
          getReceivedRequests(user.id),
          getSentRequests(user.id)
        ]);

        setHoldingList(holding);
        setContributedList(contributed);
        setReceivedRequests(received);
        setSentRequests(sent);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        showCustomAlert('error', 'Error al cargar tus libros. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

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
  const openAvailabilityModal = (bookId: string) => {
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
  const handleSetBookAvailability = async (bookId: string, isAvailable: boolean, availableDate: string | null) => {
    try {
      await setBookAvailabilityService(bookId, isAvailable, availableDate);

      // Actualizar la lista local
      setHoldingList(prevList =>
        prevList.map(book =>
          book.id === bookId
            ? { ...book, isAvailable, availableDate }
            : book
        )
      );
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error);
      showCustomAlert('error', 'Error al actualizar la disponibilidad del libro');
    }
  };

  // Obtener nombre del lector actual
  const getCurrentHolder = async (bookId: string): Promise<string> => {
    try {
      const { getCurrentBookHolder } = await import('../services/matchService');
      const holder = await getCurrentBookHolder(bookId);
      return holder?.name || 'Usuario';
    } catch (error) {
      console.error('Error al obtener lector actual:', error);
      return 'Usuario';
    }
  };

  // Aceptar solicitud de intercambio
  const handleAcceptRequest = async (requestId: string) => {
    const city = prompt('¿En qué ciudad se realizará el intercambio?');
    if (!city) {
      showCustomAlert('warning', 'Es necesario especificar la ciudad');
      return;
    }

    try {
      await acceptRequestService(requestId, city);
      showCustomAlert('success', '¡Solicitud aceptada! El libro ha sido transferido.');

      // Recargar datos
      if (user) {
        const [holding, received] = await Promise.all([
          getMyHoldingBooks(user.id),
          getReceivedRequests(user.id)
        ]);
        setHoldingList(holding);
        setReceivedRequests(received);
      }
    } catch (error: any) {
      console.error('Error al aceptar solicitud:', error);
      showCustomAlert('error', error.message || 'Error al aceptar la solicitud');
    }
  };

  // Rechazar solicitud de intercambio
  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectRequestService(requestId);
      showCustomAlert('info', 'Solicitud rechazada');

      // Recargar solicitudes recibidas
      if (user) {
        const received = await getReceivedRequests(user.id);
        setReceivedRequests(received);
      }
    } catch (error) {
      console.error('Error al rechazar solicitud:', error);
      showCustomAlert('error', 'Error al rechazar la solicitud');
    }
  };

  // Manejar selección de imágenes
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Limitar a 5 imágenes
    if (selectedImages.length + fileArray.length > 5) {
      showCustomAlert('warning', 'Máximo 5 imágenes por libro');
      return;
    }

    setSelectedImages([...selectedImages, ...fileArray]);

    // Crear previews
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Eliminar imagen seleccionada
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Agregar/Contribuir nuevo libro
  const handleAddBook = async () => {
    if (!user) return;

    // Validar campos requeridos
    if (!newBookData.title.trim() || !newBookData.author.trim() || !newBookData.city.trim()) {
      showCustomAlert('error', 'Por favor completa título, autor y ciudad');
      return;
    }

    try {
      setAddingBook(true);
      const tftCode = await contributeBook(user.id, {
        ...newBookData,
        images: selectedImages.length > 0 ? selectedImages : undefined
      });

      showCustomAlert('success', `¡Libro agregado exitosamente! Código TFT: ${tftCode}`);

      // Recargar datos
      const [holding, contributed] = await Promise.all([
        getMyHoldingBooks(user.id),
        getMyContributedBooks(user.id)
      ]);
      setHoldingList(holding);
      setContributedList(contributed);

      // Limpiar formulario y cerrar diálogo
      setNewBookData({
        title: '',
        author: '',
        isbn: '',
        coverUrl: '',
        city: ''
      });
      setSelectedImages([]);
      setImagePreviews([]);
      setAddBookDialogOpen(false);
    } catch (error: any) {
      console.error('Error al agregar libro:', error);
      showCustomAlert('error', error.message || 'Error al agregar el libro');
    } finally {
      setAddingBook(false);
    }
  };

  // Definición de los botones de pestaña
  const tabs = [
    { name: 'holding', label: 'En mi poder', icon: Book },
    { name: 'contributed', label: 'Aportados al club', icon: ListAlt },
    { name: 'exchange', label: 'Intercambios', icon: Repeat },
  ];

  // Renderizado del contenido de la pestaña activa
  const renderTabContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress />
        </Box>
      );
    }

    switch (activeTab) {
      case 'holding':
        return <HoldingTab
          list={holdingList}
          openAvailabilityModal={openAvailabilityModal}
          showCustomAlert={showCustomAlert}
          onViewTraceability={(book) => {
            setSelectedBookForTrace(book);
            setTraceabilityDialogOpen(true);
          }}
        />;
      case 'contributed':
        return <ContributedTab list={contributedList} showCustomAlert={showCustomAlert} getCurrentHolder={getCurrentHolder} />;
      case 'exchange':
        return <ExchangeTab
          received={receivedRequests}
          sent={sentRequests}
          showCustomAlert={showCustomAlert}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: '800', color: 'grey.900' }}>
          Mis Libros (TFT Tracker)
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddBookDialogOpen(true)}
          sx={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
            }
          }}
        >
          Agregar Libro
        </Button>
      </Box>

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
        setAvailability={handleSetBookAvailability}
        showCustomAlert={showCustomAlert}
      />
      <CustomAlert open={alertOpen} handleClose={handleAlertClose} alert={alertConfig} />

      {/* Dialog para agregar libro */}
      <Dialog
        open={addBookDialogOpen}
        onClose={() => !addingBook && setAddBookDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Contribuir Libro al Sistema TFT
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Al agregar un libro, se generará automáticamente un código TFT único para rastrear su recorrido.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              fullWidth
              label="Título del libro"
              value={newBookData.title}
              onChange={(e) => setNewBookData({ ...newBookData, title: e.target.value })}
              disabled={addingBook}
            />

            <TextField
              required
              fullWidth
              label="Autor"
              value={newBookData.author}
              onChange={(e) => setNewBookData({ ...newBookData, author: e.target.value })}
              disabled={addingBook}
            />

            <TextField
              fullWidth
              label="ISBN (opcional)"
              value={newBookData.isbn}
              onChange={(e) => setNewBookData({ ...newBookData, isbn: e.target.value })}
              disabled={addingBook}
            />

            <TextField
              fullWidth
              label="URL de portada (opcional)"
              value={newBookData.coverUrl}
              onChange={(e) => setNewBookData({ ...newBookData, coverUrl: e.target.value })}
              disabled={addingBook}
              helperText="Deja vacío para usar imagen por defecto"
            />

            <TextField
              required
              fullWidth
              label="Ciudad"
              value={newBookData.city}
              onChange={(e) => setNewBookData({ ...newBookData, city: e.target.value })}
              disabled={addingBook}
              helperText="Ciudad donde inicias el recorrido del libro"
            />

            {/* Sección de carga de imágenes */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Imágenes del libro (opcional)
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Sube fotos del estado del libro. Máximo 5 imágenes.
              </Typography>

              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                disabled={addingBook || selectedImages.length >= 5}
                fullWidth
                sx={{ mb: 2 }}
              >
                Seleccionar Imágenes
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleImageSelect}
                />
              </Button>

              {/* Previsualizaciones de imágenes */}
              {imagePreviews.length > 0 && (
                <ImageList sx={{ maxHeight: 200 }} cols={3} rowHeight={100}>
                  {imagePreviews.map((preview, index) => (
                    <ImageListItem key={index} sx={{ position: 'relative' }}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        loading="lazy"
                        style={{ objectFit: 'cover', height: '100%' }}
                      />
                      <MuiIconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        disabled={addingBook}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.8)',
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </MuiIconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setAddBookDialogOpen(false)} disabled={addingBook}>
            Cancelar
          </Button>
          <Button
            onClick={handleAddBook}
            variant="contained"
            disabled={addingBook}
            startIcon={addingBook ? <CircularProgress size={20} /> : <AddIcon />}
            sx={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
              }
            }}
          >
            {addingBook ? 'Agregando...' : 'Agregar Libro'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para ver trazabilidad */}
      <Dialog
        open={traceabilityDialogOpen}
        onClose={() => setTraceabilityDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Trazabilidad del Libro
        </DialogTitle>
        <DialogContent>
          {selectedBookForTrace && (
            <Box>
              {/* Información del libro */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    component="img"
                    src={selectedBookForTrace.coverUrl}
                    alt={selectedBookForTrace.title}
                    sx={{
                      width: 100,
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 1,
                      boxShadow: 2
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Chip
                      label={selectedBookForTrace.code}
                      size="small"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        mb: 1,
                        bgcolor: 'primary.100',
                        color: 'primary.700'
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {selectedBookForTrace.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {selectedBookForTrace.author}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={`${selectedBookForTrace.totalExchanges} intercambios`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${selectedBookForTrace.daysHeld} días en tu poder`}
                        size="small"
                        color="primary"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Timeline de intercambios */}
              <Typography variant="h6" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                Historial de Intercambios
              </Typography>

              <Box sx={{ position: 'relative', pl: 4 }}>
                {/* Línea vertical del timeline */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 15,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    bgcolor: 'grey.300'
                  }}
                />

                {/* Items del timeline - Datos de ejemplo */}
                {[
                  {
                    date: selectedBookForTrace.receivedDate,
                    city: selectedBookForTrace.cities[selectedBookForTrace.cities.length - 1] || 'Ciudad',
                    holder: 'Tú',
                    action: 'Recibiste el libro',
                    current: true
                  },
                  ...selectedBookForTrace.cities.slice(0, -1).reverse().map((city, idx) => ({
                    date: new Date(new Date(selectedBookForTrace.receivedDate).getTime() - (idx + 1) * 15 * 24 * 60 * 60 * 1000).toISOString(),
                    city,
                    holder: `Lector ${idx + 2}`,
                    action: 'Intercambio',
                    current: false
                  }))
                ].map((item, index) => (
                  <Box key={index} sx={{ mb: 3, position: 'relative' }}>
                    {/* Punto en el timeline */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: -28,
                        top: 8,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.current ? 'primary.main' : 'grey.400',
                        border: '2px solid white',
                        boxShadow: 1
                      }}
                    />

                    <Paper
                      elevation={item.current ? 3 : 1}
                      sx={{
                        p: 2,
                        bgcolor: item.current ? 'primary.50' : 'white',
                        borderLeft: 3,
                        borderColor: item.current ? 'primary.main' : 'grey.300'
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="700" gutterBottom>
                        {item.action}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {new Date(item.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip
                          label={item.city}
                          size="small"
                          icon={<LocationIcon sx={{ fontSize: 14 }} />}
                        />
                        <Chip
                          label={item.holder}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Estadísticas */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                  Estadísticas del Recorrido
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        {selectedBookForTrace.totalExchanges}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Intercambios
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        {selectedBookForTrace.cities.length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ciudades
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        {selectedBookForTrace.avgReadingTime}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Días promedio
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        {Math.round((new Date().getTime() - new Date(selectedBookForTrace.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Días en circulación
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setTraceabilityDialogOpen(false)} variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
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
