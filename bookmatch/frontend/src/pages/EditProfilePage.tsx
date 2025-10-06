import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  PhotoCamera,
  Save,
  Cancel,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { uploadProfilePhoto, uploadCoverPhoto } from '../services/storageService';

const EditProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    quote: '',
    photoUrl: '',
    coverUrl: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoadingData(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData({
            name: data.name || user.name || '',
            username: data.username || '',
            email: user.email || '',
            quote: data.quote || '',
            photoUrl: data.photoUrl || '',
            coverUrl: data.coverUrl || '',
          });
        } else {
          setFormData({
            name: user.name || '',
            username: '',
            email: user.email || '',
            quote: '',
            photoUrl: '',
            coverUrl: '',
          });
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        setFormData({
          name: user.name || '',
          username: '',
          email: user.email || '',
          quote: '',
          photoUrl: '',
          coverUrl: '',
        });
      } finally {
        setLoadingData(false);
      }
    };

    loadUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      // Actualizar datos en Firestore
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        name: formData.name,
        username: formData.username,
        quote: formData.quote,
        photoUrl: formData.photoUrl,
        coverUrl: formData.coverUrl,
        updatedAt: new Date().toISOString(),
      });

      setSuccess(true);

      // Redirigir al perfil después de 1.5 segundos
      setTimeout(() => {
        navigate('/profile');
        // Recargar la página para actualizar el contexto
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error('Error al actualizar perfil:', err);
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handlePhotoUpload = () => {
    photoInputRef.current?.click();
  };

  const handleCoverUpload = () => {
    coverInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingPhoto(true);
    setError('');

    try {
      const photoUrl = await uploadProfilePhoto(file, user.id);
      setFormData(prev => ({ ...prev, photoUrl }));
    } catch (err: any) {
      setError(err.message || 'Error al subir la foto de perfil');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingCover(true);
    setError('');

    try {
      const coverUrl = await uploadCoverPhoto(file, user.id);
      setFormData(prev => ({ ...prev, coverUrl }));
    } catch (err: any) {
      setError(err.message || 'Error al subir la foto de portada');
    } finally {
      setUploadingCover(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Debes iniciar sesión para editar tu perfil</Alert>
      </Container>
    );
  }

  if (loadingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleCancel} color="primary">
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Editar Perfil
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              ¡Perfil actualizado exitosamente! Redirigiendo...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Input oculto para foto de perfil */}
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              style={{ display: 'none' }}
            />

            {/* Input oculto para foto de portada */}
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleCoverChange}
              accept="image/*"
              style={{ display: 'none' }}
            />

            {/* Foto de perfil */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Foto de Perfil
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={formData.photoUrl}
                  alt={formData.name}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  {formData.name.charAt(0).toUpperCase()}
                </Avatar>
                <IconButton
                  onClick={handlePhotoUpload}
                  disabled={uploadingPhoto}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {uploadingPhoto ? <CircularProgress size={20} color="inherit" /> : <PhotoCamera />}
                </IconButton>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Click en el ícono de cámara para subir una imagen (máx. 5MB)
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Foto de portada */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Foto de Portada
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  borderRadius: 2,
                  backgroundImage: formData.coverUrl
                    ? `url(${formData.coverUrl})`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  onClick={handleCoverUpload}
                  disabled={uploadingCover}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      bgcolor: 'white',
                    },
                  }}
                >
                  {uploadingCover ? <CircularProgress size={24} /> : <PhotoCamera />}
                </IconButton>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Click en el ícono de cámara para subir una imagen de portada (máx. 5MB)
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Información básica */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Información Básica
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ej: @usuario123"
                  helperText="Tu identificador único en la plataforma"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  value={formData.email}
                  disabled
                  helperText="El email no se puede cambiar"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Frase favorita"
                  name="quote"
                  value={formData.quote}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  placeholder="Ej: No hay amigo más leal que un libro — Ernest Hemingway"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Botones de acción */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditProfilePage;
