import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import Home from './pages/Home'
import { lightTheme, darkTheme } from './themes/theme';
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark');

  const getTheme = () => {
    return createTheme(theme === 'light' ? lightTheme : darkTheme);
  };

  return (
    <>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <Header setTheme={setTheme} />
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
