import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ResultCard = () => {
    const theme = useTheme();

    return (
        <Card sx={{
            display: 'flex',
            borderRadius: 10,
        }}>
            <CardMedia
                component="img"
                sx={{ width: 200, height: 150 }}
                image="https://picsum.photos/200/150"
                alt="Live from space album cover"
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <CardContent sx={{
                    flex: '1 0 auto',
                }}>
                    <Typography variant='h5'>
                        Location
                    </Typography>
                    <Typography variant='subtitle1'>
                        This is where you are located
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default ResultCard;