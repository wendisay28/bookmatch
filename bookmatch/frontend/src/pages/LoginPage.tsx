import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError('');
    setError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validar campos
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      return;
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || '');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      // El navigate se hace automáticamente en el AuthContext
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e0e0e0',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#333333', mb: 1 }}>
                Bienvenido a Ruedelo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inicia sesión para continuar
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                required
                autoFocus
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: emailError ? 'error.main' : '#2e6ff2' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                error={!!passwordError}
                helperText={passwordError}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#2e6ff2' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !email || !password}
                sx={{
                  bgcolor: '#2e6ff2',
                  color: 'white',
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  mb: 2,
                  '&:hover': {
                    bgcolor: '#1e5fd9',
                  },
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{
                    color: '#2e6ff2',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
            </Box>

            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes cuenta?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#2e6ff2',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Regístrate aquí
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
