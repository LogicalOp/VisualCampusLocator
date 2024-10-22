import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ColorThemeTabs from './ColorThemeTabs';
import { useTheme } from '@mui/material/styles';

const Header = ({ setTheme }) => {
    const theme = useTheme();
    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
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