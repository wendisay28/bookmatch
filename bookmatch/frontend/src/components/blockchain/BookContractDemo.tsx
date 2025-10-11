/**
 * Book Contract Demo Component
 * LATIN HACK - Demo/Testing Component for Smart Contract Integration
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import {
  AccountBalanceWallet,
  LibraryBooks,
  SwapHoriz,
  CheckCircle
} from '@mui/icons-material';
import { useBookContract } from '../../hooks/useBookContract';

export const BookContractDemo: React.FC = () => {
  const {
    isConnected,
    isConnecting,
    account,
    error,
    isLoading,
    connectWallet,
    disconnect,
    registerBook,
    transferOwnership,
    getBook,
    getMyBooks,
    getTotalBooks
  } = useBookContract();

  // Form states
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [transferBookId, setTransferBookId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [searchBookId, setSearchBookId] = useState('');

  // Results
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [myBooks, setMyBooks] = useState<string[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>('');

  /**
   * Load initial data when connected
   */
  const loadInitialData = async () => {
    try {
      const [books, total] = await Promise.all([
        getMyBooks(),
        getTotalBooks()
      ]);
      setMyBooks(books);
      setTotalBooks(total);
    } catch (err) {
      console.error('Error loading initial data:', err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  /**
   * Handle register book
   */
  const handleRegisterBook = async () => {
    if (!bookId || !bookTitle) {
      alert('Por favor completa todos los campos');
      return;
    }

    setSuccessMessage('');
    const result = await registerBook(bookId, bookTitle);

    if (result.success) {
      setSuccessMessage(`¡Libro registrado! Hash: ${result.transactionHash}`);
      setBookId('');
      setBookTitle('');
      // Refresh data
      loadInitialData();
    }
  };

  /**
   * Handle transfer ownership
   */
  const handleTransferOwnership = async () => {
    if (!transferBookId || !newOwner) {
      alert('Por favor completa todos los campos');
      return;
    }

    setSuccessMessage('');
    const result = await transferOwnership(transferBookId, newOwner);

    if (result.success) {
      setSuccessMessage(`¡Propiedad transferida! Hash: ${result.transactionHash}`);
      setTransferBookId('');
      setNewOwner('');
      // Refresh data
      loadInitialData();
    }
  };

  /**
   * Handle search book
   */
  const handleSearchBook = async () => {
    if (!searchBookId) {
      alert('Por favor ingresa un ID de libro');
      return;
    }

    setBookInfo(null);
    const book = await getBook(searchBookId);

    if (book) {
      setBookInfo(book);
    } else {
      alert('Libro no encontrado');
    }
  };

  /**
   * Format address for display
   */
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        📚 Book Traceability - Smart Contract Demo
      </Typography>

      {/* Connection Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" gutterBottom>
                <AccountBalanceWallet sx={{ mr: 1, verticalAlign: 'middle' }} />
                Conexión Wallet
              </Typography>
              {isConnected && account && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Dirección: {formatAddress(account.address)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Balance: {account.balance} PAS
                  </Typography>
                  <Chip
                    label="Passet Hub Testnet"
                    size="small"
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                </Box>
              )}
            </Box>
            <Box>
              {!isConnected ? (
                <Button
                  variant="contained"
                  onClick={connectWallet}
                  disabled={isConnecting}
                  startIcon={isConnecting ? <CircularProgress size={20} /> : <AccountBalanceWallet />}
                >
                  {isConnecting ? 'Conectando...' : 'Conectar MetaMask'}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={disconnect}
                  color="error"
                >
                  Desconectar
                </Button>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => {}}>
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {/* Success Alert */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {/* Statistics */}
      {isConnected && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 Estadísticas
            </Typography>
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="h4">{totalBooks}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de Libros
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4">{myBooks.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Mis Libros
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Main Content - Only show if connected */}
      {isConnected && (
        <Stack spacing={3}>
          {/* Register Book */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <LibraryBooks sx={{ mr: 1, verticalAlign: 'middle' }} />
                Registrar Libro
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Book ID"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  placeholder="book-001"
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Título"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Cien Años de Soledad"
                  fullWidth
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleRegisterBook}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <CheckCircle />}
                >
                  {isLoading ? 'Registrando...' : 'Registrar en Blockchain'}
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Transfer Ownership */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SwapHoriz sx={{ mr: 1, verticalAlign: 'middle' }} />
                Transferir Propiedad
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Book ID"
                  value={transferBookId}
                  onChange={(e) => setTransferBookId(e.target.value)}
                  placeholder="book-001"
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Nueva Dirección de Propietario"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  placeholder="0x..."
                  fullWidth
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleTransferOwnership}
                  disabled={isLoading}
                  color="secondary"
                  startIcon={isLoading ? <CircularProgress size={20} /> : <SwapHoriz />}
                >
                  {isLoading ? 'Transfiriendo...' : 'Transferir'}
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Search Book */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔍 Buscar Libro
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Book ID"
                  value={searchBookId}
                  onChange={(e) => setSearchBookId(e.target.value)}
                  placeholder="book-001"
                  fullWidth
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={handleSearchBook}
                  disabled={isLoading}
                >
                  {isLoading ? 'Buscando...' : 'Buscar'}
                </Button>

                {bookInfo && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      <strong>ID:</strong> {bookInfo.bookId}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Título:</strong> {bookInfo.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Propietario Actual:</strong> {formatAddress(bookInfo.currentOwner)}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Registrado:</strong> {new Date(bookInfo.registeredAt).toLocaleString()}
                    </Typography>
                    {bookInfo.transactionHistory.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Historial de Transferencias:
                        </Typography>
                        <List dense>
                          {bookInfo.transactionHistory.map((tx: any, index: number) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={`${formatAddress(tx.from)} → ${formatAddress(tx.to)}`}
                                secondary={new Date(tx.timestamp).toLocaleString()}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* My Books */}
          {myBooks.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📚 Mis Libros ({myBooks.length})
                </Typography>
                <List>
                  {myBooks.map((id, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={id} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Stack>
      )}

      {/* Not Connected Message */}
      {!isConnected && !isConnecting && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <AccountBalanceWallet sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Conecta tu Wallet para Comenzar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Necesitas conectar MetaMask a la red Passet Hub Testnet
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={connectWallet}
              startIcon={<AccountBalanceWallet />}
            >
              Conectar MetaMask
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default BookContractDemo;
