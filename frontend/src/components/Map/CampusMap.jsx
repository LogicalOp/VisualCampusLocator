import React, { useState, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ResultsPanel from './ResultsPanel';
import 'mapbox-gl/dist/mapbox-gl.css';
import buildingsData from '../../assets/buildings.json';

const CampusMap = () => {
  const [files, setFiles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [marker, setMarker] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -6.60037,
    latitude: 53.38392,
    zoom: 15.5,
  });

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(newFiles);
    if (newFiles.length > 0) {
      setUploadedImage(newFiles[0].preview);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    noClick: files.length > 0,
    noDrag: files.length > 0,
  });

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await fetch('http://localhost:3000/api/image/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Files submitted:', files);
        console.log(data);

        // Strip numbers from the end of the location name
        const strippedLocationName = data.location_name.replace(/\d+$/, '');

        setResultImage(data.cloud_url);
        setLocationName(strippedLocationName); // Set the stripped location name
        setIsDialogOpen(false); // Close the dialog
        setShowResults(true); // Show the results panel

        const building = buildingsData.buildings.find((building) => building.name === strippedLocationName);
        if (building) {
          setMarker({
            longitude: building.longitude,
            latitude: building.latitude,
          });
          setViewState({
            longitude: building.longitude,
            latitude: building.latitude,
            zoom: 15.5,
          });
        }
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload failed: Please try again', error);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const thumbs = files.map((file) => (
    <div key={file.name} style={{ display: 'inline-flex', borderRadius: 2, border: '1px solid #eaeaea', marginBottom: 8, marginRight: 8, width: 300, height: 300, padding: 4, boxSizing: 'border-box', position: 'relative' }}>
      <div style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
        <img src={file.preview} style={{ display: 'block', width: 'auto', height: '100%' }} alt={file.name} />
      </div>
      <Button
        onClick={() => handleRemoveFile(file)}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        X
      </Button>
    </div>
  ));

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 2,
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            Upload Image
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Upload</DialogTitle>
          <DialogDescription>
            Select an image to upload
          </DialogDescription>
          <aside style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            {thumbs}
          </aside>
          {files.length === 0 && (
            <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #eaeaea', borderRadius: '4px', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} />
              <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            </div>
          )}
          <Button onClick={handleSubmit} style={{ marginTop: '10px' }} disabled={files.length === 0}>Submit</Button>
        </DialogContent>
      </Dialog>
      {showResults && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}>
          <ResultsPanel isVisible={showResults} onClose={handleCloseResults} uploadedImage={uploadedImage} imageResult={resultImage} locationName={locationName} />
        </div>
      )}
      <Map
        mapboxAccessToken="pk.eyJ1IjoibG9naWNhbG9wIiwiYSI6ImNtMmQ2cGV5MjE5cWUyanIyaWluM3UxNjIifQ.yL7tFy0NzUNmMWq7jtTHCg"
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        mapStyle="mapbox://styles/logicalop/cm73hs0j8004z01s6egs83rsw"
      >
        {marker && (
          <Marker longitude={marker.longitude} latitude={marker.latitude}>
            <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '10px', height: '10px' }} />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default CampusMap;