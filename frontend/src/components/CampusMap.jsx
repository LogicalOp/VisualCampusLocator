import React, { useState, useEffect } from 'react';
import Map, { Source, Layer, Popup, Marker } from 'react-map-gl';
import { Typography } from '@mui/material/';
import 'mapbox-gl/dist/mapbox-gl.css';
import geojson from '../assets/geojson.json';

const CampusMap = ({ longitude, latitude, building }) => {
    const [hoverInfo, setHoverInfo] = useState(null);
    const [markerCoordinates, setMarkerCoordinates] = useState({ longitude, latitude });

    useEffect(() => {
        if (building) {
            const buildingFeature = geojson.features.find(feature => feature.properties.name === building);
            if (buildingFeature) {
                const [longitude, latitude] = buildingFeature.geometry.coordinates;
                setMarkerCoordinates({ longitude, latitude });
            }
        }
    }, [building]);

    return (
        <Map
            mapboxAccessToken="pk.eyJ1IjoibG9naWNhbG9wIiwiYSI6ImNtMmQ2cGV5MjE5cWUyanIyaWluM3UxNjIifQ.yL7tFy0NzUNmMWq7jtTHCg"
            initialViewState={{
                longitude: -6.60037,
                latitude: 53.38392,
                zoom: 15.5,
            }}
            style={{
                height: 510,
                width: 650,
                maxHeight: { xs: 233, md: 167, lg: 500 },
                maxWidth: { xs: 350, md: 250, lg: 650 },
                alignItems: "center",
                display: "flex",
                margin: "auto",
                borderRadius: 15,
            }}
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
            {building && (
                <Marker longitude={markerCoordinates.longitude} latitude={markerCoordinates.latitude} color="red" onClick={(e) => e.originalEvent.stopPropagation()}>
                </Marker>
            )}
        </Map>
    );
};

export default CampusMap;