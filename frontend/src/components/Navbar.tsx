import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Settings,
  Logout,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleMenuClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleMenuClose();
    try {
      logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}
          >
            BookMatch
          </Typography>

          <Box>
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    sx={{ width: 40, height: 40, bgcolor: 'secondary.main' }}
                    alt={user?.name || 'Usuario'}
                  >
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        minWidth: 200,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user?.name || 'Usuario'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>

                  <Divider />

                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Perfil</ListItemText>
                  </MenuItem>

                  <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Configuración</ListItemText>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cerrar sesión</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ mx: 1 }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/register"
                  sx={{ ml: 1 }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
