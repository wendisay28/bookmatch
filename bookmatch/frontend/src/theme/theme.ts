import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      maxContentWidth: number;
    };
  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      maxContentWidth?: number;
    };
  }
}

const theme = createTheme({
  custom: {
    maxContentWidth: 1200,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2e6ff2', // Ruedelo blue
      light: '#5e8ff5',
      dark: '#1a4fdb',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#53f682', // Ruedelo green
      light: '#7af89f',
      dark: '#2ee165',
      contrastText: '#333333',
    },
    background: {
      default: '#F5F5F5', // Light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#64748B',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    info: {
      main: '#06B6D4',
    },
  },
  typography: {
    fontFamily: [
      '"Nunito"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '12px 32px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #2e6ff2 0%, #5e8ff5 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1a4fdb 0%, #2e6ff2 100%)',
            boxShadow: '0 16px 32px rgba(46, 111, 242, 0.4)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(46, 111, 242, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          fontSize: '0.875rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        },
      },
    },
  },
});

export default theme;
