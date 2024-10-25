import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ColorThemeTabs from './ColorThemeTabs';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

const Header = ({ setTheme }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/')}
                    >
                        <HomeSharpIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        VPR (demo)
                    </Typography>
                    <ColorThemeTabs setTheme={setTheme} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;