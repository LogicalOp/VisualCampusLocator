import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material/';
import CampusMap from '../components/CampusMap';

const Test = () => {
    const location = useLocation();
    // Get the coordinates from the previous page (Building, Coordinates)
    const { longitude, latitude, building } = location.state || { longitude: -6.60037, latitude: 53.38392, building: null };

    return (
        <>
            <Box sx={{
                height: 400,
                width: 400,
                maxHeight: { xs: 400, md: 850 },
                maxWidth: { xs: 400, md: 400 },
                alignItems: 'center',
                display: 'flex',
                margin: 'auto',
            }}>
                <CampusMap longitude={longitude} latitude={latitude} building={building} />
            </Box>
        </>
    );
};

export default Test;