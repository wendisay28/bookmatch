import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { SnackbarProvider } from 'notistack';

// Theme
import theme from './theme/theme';

// Pages
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import MashPage from './pages/MashPage';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';

// Components
import BottomNav from './components/BottomNav';
import TopAppBar from './components/TopAppBar';

// Context
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';

// Layout component to handle different layouts based on route
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      {!isAuthPage && <TopAppBar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: location.pathname === '/' ? 0 : { xs: 8, md: 4 },
          pt: location.pathname === '/' ? 0 : { xs: 7, sm: 8 },
          maxWidth: location.pathname === '/' ? '100%' : 1200,
          width: '100%',
          mx: 'auto',
          px: location.pathname === '/' ? 0 : { xs: 2, sm: 3, md: 4 },
          overflowX: 'hidden'
        }}
      >
        {children}
      </Box>
      <BottomNav />
    </Box>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <MenuProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={3000}
            >
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<LibraryPage />} />
                  <Route path="/mash" element={<MashPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </Layout>
            </SnackbarProvider>
          </MenuProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
