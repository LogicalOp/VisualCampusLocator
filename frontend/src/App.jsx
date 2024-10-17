import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline'
import Home from './pages/Home'
import './App.css'

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ed4b82',
    },
    secondary: {
      main: '#18181c',
    },
  },
});

function App() {

  return (
    <>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App
