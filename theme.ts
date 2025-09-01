import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FBBF24', // yellow-400
      contrastText: '#111827',
    },
    secondary: {
      main: '#e0e0e0', // gray
      contrastText: '#111827',
    },
    success: {
        main: '#10B981', // green
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#18181B',
      secondary: '#3F3F46',
    },
    info: {
        main: '#9fc5f8', // Light blue from original design
        contrastText: '#000'
    }
  },
  typography: {
    fontFamily: '"Balsamiq Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
    },
     h4: {
        fontSize: '1.5rem',
        fontWeight: 700,
    },
     h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
    },
     h6: {
        fontSize: '1rem',
        fontWeight: 600,
    },
    button: {
        fontWeight: 'bold',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 10,
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 10,
            }
        }
    }
  },
});
