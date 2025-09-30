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
  Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const TopAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();

  const routes = [
    { path: '/', label: 'Inicio', icon: <HomeIcon /> },
    { path: '/explore', label: 'Explorar', icon: <SearchIcon /> },
    { path: '/mash', label: 'MASH', icon: <MashIcon /> },
    { path: '/events', label: 'Eventos', icon: <EventIcon /> },
    { path: '/profile', label: 'Perfil', icon: <PersonIcon /> },
  ];

  const currentRoute = routes.findIndex(route => route.path === location.pathname);

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }} 
          onClick={() => navigate('/')}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              display: { xs: 'none', sm: 'block' },
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
            <IconButton color="inherit" onClick={() => {}}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => {}} sx={{ ml: 1 }}>
              <Badge badgeContent={2} color="error">
                <MessagesIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate('/profile')}
              sx={{ ml: 1 }}
            >
              <Avatar 
                alt={user?.name || 'Usuario'} 
                src={user?.avatar} 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText
                }}
              >
                {user?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
