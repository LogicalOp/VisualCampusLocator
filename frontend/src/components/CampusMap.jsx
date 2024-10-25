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
                longitude: markerCoordinates.longitude,
                latitude: markerCoordinates.latitude,
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
                    <Typography sx={{ color: 'black' }}>{hoverInfo.title}</Typography>
                </Popup>
            )}
            <Marker longitude={markerCoordinates.longitude} latitude={markerCoordinates.latitude} color="red" onClick={(e) => e.originalEvent.stopPropagation()}>
            </Marker>
        </Map>
    );
};

export default CampusMap;