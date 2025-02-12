import { useState, useCallback } from 'react';
import Map from 'react-map-gl/mapbox';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ResultsPanel from './ResultsPanel';
import 'mapbox-gl/dist/mapbox-gl.css';

const CampusMap = () => {
  const [files, setFiles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

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

  const handleSubmit = () => {
    // Handle file upload submission
    console.log('Files submitted:', files);
    setIsDialogOpen(false); // Close the dialog
    setShowResults(true); // Show the results panel
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
        <ResultsPanel isVisible={showResults} onClose={handleCloseResults} uploadedImage={uploadedImage} />
      </div>
      )}
      <Map
        mapboxAccessToken="pk.eyJ1IjoibG9naWNhbG9wIiwiYSI6ImNtMmQ2cGV5MjE5cWUyanIyaWluM3UxNjIifQ.yL7tFy0NzUNmMWq7jtTHCg"
        initialViewState={{
          longitude: -6.60037,
          latitude: 53.38392,
          zoom: 15.5,
        }}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </div>
  );
};

export default CampusMap;