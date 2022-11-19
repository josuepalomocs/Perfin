import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(255, 255, 255, 0.12)',
    text: {
      primary: '#00000',
      secondary: '#00000',
    }
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
});

export default theme;