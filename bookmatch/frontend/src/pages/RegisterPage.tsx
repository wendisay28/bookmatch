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
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // El navigate se hace automáticamente en el AuthContext
    } catch (err: any) {
      setError(err.message || 'Error al registrar el usuario. Inténtalo de nuevo.');
      console.error('Error en registro:', err);
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
      <Container maxWidth="md">
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
                Crear Cuenta en Ruedelo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Únete y descubre tu próxima lectura favorita
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#2e6ff2' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#2e6ff2' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
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

                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#2e6ff2' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ gridColumn: '1 / -1' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        sx={{
                          color: '#2e6ff2',
                          '&.Mui-checked': {
                            color: '#2e6ff2',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        Acepto los{' '}
                        <Link href="#" sx={{ color: '#2e6ff2' }}>
                          Términos de Servicio
                        </Link>{' '}
                        y la{' '}
                        <Link href="#" sx={{ color: '#2e6ff2' }}>
                          Política de Privacidad
                        </Link>
                      </Typography>
                    }
                  />
                </Box>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  loading ||
                  !formData.name ||
                  !formData.email ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  !formData.acceptTerms
                }
                sx={{
                  bgcolor: '#2e6ff2',
                  color: 'white',
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  mt: 3,
                  mb: 2,
                  '&:hover': {
                    bgcolor: '#1e5fd9',
                  },
                }}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: '#2e6ff2',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Inicia sesión aquí
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
