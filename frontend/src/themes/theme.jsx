import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#660033',
    },
    secondary: {
      main: '#18181c',
    },
  },
  /*components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: '#F0F',
          color: '#fff',
        },
      },
    },
  },*/
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#660033',
    },
    secondary: {
      main: '#660033',
    },
  },
});

export { lightTheme, darkTheme };