import React, { useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import { Box, Typography } from '@mui/material/';
import 'mapbox-gl/dist/mapbox-gl.css';
import geojson from '../assets/geojson.json';

const Test = () => {
    const [hoverInfo, setHoverInfo] = useState(null);

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
                <Map
                    mapboxAccessToken="pk.eyJ1IjoibG9naWNhbG9wIiwiYSI6ImNtMmQ2cGV5MjE5cWUyanIyaWluM3UxNjIifQ.yL7tFy0NzUNmMWq7jtTHCg"
                    initialViewState={{
                        longitude: -6.60037,
                        latitude: 53.38392,
                        zoom: 15
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    interactiveLayerIds={['polygon']}
                    onPointerMove={(event) => {
                        const { features } = event;
                        const hoveredFeature = features && features.find(f => f.layer.id === 'polygon');
                        setHoverInfo(hoveredFeature ? {
                            longitude: event.lngLat.lng,
                            latitude: event.lngLat.lat,
                            title: hoveredFeature.properties.title
                        } : null);
                    }}
                    onClick={(event) => {
                        const { features } = event;
                        const clickedFeature = features && features.find(f => f.layer.id === 'polygon');
                        setHoverInfo(clickedFeature ? {
                            longitude: event.lngLat.lng,
                            latitude: event.lngLat.lat,
                            title: clickedFeature.properties.title
                        } : null);
                    }}
                >
                    <Source id="my-data" type="geojson" data={geojson}>
                        <Layer
                            id="polygon"
                            type="fill"
                            paint={{
                                'fill-color': '#555555',
                                'fill-opacity': 0.5
                            }}
                        />
                        <Layer
                            id="outline"
                            type="line"
                            paint={{
                                'line-color': '#555555',
                                'line-width': 2
                            }}
                        />
                    </Source>
                    {hoverInfo && (
                        <Popup
                            longitude={hoverInfo.longitude}
                            latitude={hoverInfo.latitude}
                            closeButton={false}
                            closeOnClick={false}
                            anchor="top"
                        >
                            <Typography sx={{ color: 'black'}}>{hoverInfo.title}</Typography>
                        </Popup>
                    )}
                </Map>
            </Box>
        </>
    );
};

export default Test;

