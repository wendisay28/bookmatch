import React from 'react';
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
  Tab
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  ChatBubbleOutline as MessagesIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  SwapHoriz as MashIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';

interface TopAppBarProps {
  onMenuClick?: () => void;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const { setMobileMenuOpen } = useMenu();

  const routes = [
    { path: '/', label: 'Inicio', icon: <HomeIcon /> },
    { path: '/explore', label: 'Explorar', icon: <SearchIcon /> },
    { path: '/mash', label: 'Match', icon: <MashIcon /> },
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
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
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
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' },
              fontSize: '1.5rem',
            }}
          >
            BookMatch
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
            onChange={(e, newValue) => navigate(routes[newValue].path)}
            indicatorColor="primary"
            textColor="primary"
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              '& .MuiTab-root': {
                minWidth: 120,
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
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
              <IconButton
                onClick={() => navigate('/profile')}
                sx={{
                  ml: 2,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Avatar
                  alt={user?.name || 'Usuario'}
                  src={user?.avatar}
                  sx={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    color: 'white',
                    fontWeight: 700,
                    border: '2px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  {user?.name?.[0] || 'U'}
                </Avatar>
              </IconButton>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
