import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  ChatBubbleOutline as MessagesIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Settings,
  Logout,
  WorkspacePremium as PremiumIcon,
  Favorite as MatchIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface TopAppBarProps {
  onMenuClick?: () => void;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const { setMobileMenuOpen } = useMenu();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string>('');
  const open = Boolean(anchorEl);

  useEffect(() => {
    const loadUsername = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || '');
        }
      } catch (error) {
        console.error('Error loading username:', error);
      }
    };

    loadUsername();
  }, [user]);

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

  // const handleEditProfile = () => {
  //   handleMenuClose();
  //   navigate('/profile/edit');
  // };

  const handleSettings = () => {
    handleMenuClose();
    navigate('/settings');
  };

  const handleSubscription = () => {
    handleMenuClose();
    navigate('/subscription');
  };

  const handleLogout = () => {
    handleMenuClose();
    try {
      logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const routes = [
    { path: '/', label: 'Inicio', icon: <HomeIcon /> },
    { path: '/explore', label: 'Explorar', icon: <SearchIcon /> },
    { path: '/match', label: 'Match', icon: <MatchIcon /> },
    { path: '/events', label: 'Eventos', icon: <EventIcon /> },
  ];

  const currentRoute = routes.findIndex(route => route.path === location.pathname);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 64, sm: 72 } }}>
        {/* Left side - Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 2,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: '1.25rem',
                color: 'white',
              }}
            >
              B
            </Typography>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' },
              fontSize: '1.5rem',
            }}
          >
            Ruedelo
          </Typography>
        </Box>

        {/* Center - Search (only on desktop) */}
        {!isMobile && (
          <Box sx={{ 
            flexGrow: 1, 
            maxWidth: 600, 
            mx: 4,
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* Search bar would go here */}
          </Box>
        )}

        {/* Right side - Navigation and Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Desktop Navigation */}
          <Tabs
            value={currentRoute}
            onChange={(_, newValue) => navigate(routes[newValue].path)}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              display: { xs: 'none', md: 'flex' },
              '& .MuiTab-root': {
                minWidth: 100,
                minHeight: 64,
              }
            }}
          >
            {routes.map((route) => (
              <Tab 
                key={route.path} 
                label={route.label} 
                icon={route.icon} 
                iconPosition="start"
              />
            ))}
          </Tabs>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
            <IconButton
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  color: 'secondary.main',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => {}}
            >
              <Badge
                badgeContent={2}
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    fontSize: '0.65rem',
                    minWidth: '18px',
                    height: '18px',
                    fontWeight: 700,
                  },
                }}
              >
                <MessagesIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => {}}
            >
              <Badge
                badgeContent={4}
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                    fontSize: '0.65rem',
                    minWidth: '18px',
                    height: '18px',
                    fontWeight: 700,
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Mobile Menu Button - Only show on mobile and on HomePage */}
            {isMobile && location.pathname === '/' && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  transition: 'all 0.2s ease',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: 'primary.main',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop Avatar - Only show on desktop */}
            {!isMobile && (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    ml: 2,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                  aria-controls={open ? 'user-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    alt={user?.name || 'Usuario'}
                    src={user?.avatar}
                    sx={{
                      width: 36,
                      height: 36,
                      background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
                      color: 'white',
                      fontWeight: 700,
                      border: '2px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    {user?.name?.[0] || 'U'}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="user-menu"
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
                        minWidth: 220,
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
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user?.name || 'Usuario'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {username ? `@${username}` : user?.email}
                    </Typography>
                  </Box>

                  <Divider />

                  <MenuItem
                    onClick={handleSubscription}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(46, 111, 242, 0.08)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <PremiumIcon fontSize="small" sx={{ color: user?.subscriptionStatus === 'active' ? '#FFD700' : 'text.secondary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={user?.subscriptionStatus === 'active' ? 'Premium' : 'Freemium'}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: user?.subscriptionStatus === 'active' ? '#FFD700' : 'text.primary',
                      }}
                    />
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
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
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
