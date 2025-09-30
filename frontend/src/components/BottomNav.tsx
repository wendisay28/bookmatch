import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  SwapHoriz as MashIcon,
  Event as EventIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // Update selected tab based on current route
    const path = location.pathname;
    if (path === '/') setValue(0);
    else if (path === '/explore') setValue(1);
    else if (path === '/mash') setValue(2);
    else if (path === '/events') setValue(3);
    else if (path === '/profile') setValue(4);
  }, [location]);

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        display: { xs: 'block', md: 'none' } // Solo mostrar en móviles
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.7rem',
            '&.Mui-selected': {
              fontSize: '0.7rem',
            },
          },
        }}
      >
        <BottomNavigationAction 
          label="Inicio" 
          icon={<HomeIcon />} 
          onClick={() => navigate('/')}
        />
        <BottomNavigationAction 
          label="Explorar" 
          icon={<SearchIcon />} 
          onClick={() => navigate('/explore')}
        />
        <BottomNavigationAction 
          label="MASH" 
          icon={<MashIcon />} 
          onClick={() => navigate('/mash')}
          sx={{
            '&.Mui-selected': {
              color: 'primary.main',
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.3)',
                transition: 'transform 0.2s',
              },
            },
          }}
        />
        <BottomNavigationAction 
          label="Eventos" 
          icon={<EventIcon />} 
          onClick={() => navigate('/events')}
        />
        <BottomNavigationAction 
          label="Perfil" 
          icon={<PersonIcon />} 
          onClick={() => navigate('/profile')}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
