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
        display: { xs: 'block', md: 'none' },
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: 'transparent',
          height: 70,
          paddingTop: 1,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '8px 12px',
            transition: 'all 0.3s ease',
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.2)',
              },
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            fontWeight: 600,
            marginTop: '4px',
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.75rem',
            transition: 'transform 0.3s ease',
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
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
              borderRadius: 3,
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
