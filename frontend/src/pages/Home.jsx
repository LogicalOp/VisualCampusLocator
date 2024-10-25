import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button, Box, Stack, CircularProgress, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Home = () => {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    function handleUpload(event) {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    async function handleSubmit() {
        if (!image) {
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch('http://localhost:3000/image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                console.error('Failed to upload image');
                return;
            }

            const result = await response.json();
            console.log(result);
            // Navigate to the next page with results (Building name, Coordinates) (Unfinished)
            navigate('/results', { state: { longitude: -6.60037, latitude: 53.38392 } });
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <>
            {preview && (
                <Box
                    component="img"
                    sx={{
                        height: 900,
                        width: 900,
                        maxHeight: { xs: 233, md: 167, lg: 250 },
                        maxWidth: { xs: 350, md: 250, lg: 350 },
                        alignItems: 'center',
                        display: 'flex',
                        margin: 'auto',
                    }}
                    alt=""
                    src={preview}
                />
            )}
            <br />
            <Stack spacing={2} direction="row">
                {image && (
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick={() => {
                            setImage();
                            setPreview();
                        }}
                        startIcon={<ClearSharpIcon />}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    disabled={!!image}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleUpload}
                        multiple
                    />
                </Button>
                {image && (

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick={handleSubmit}
                        endIcon={<NavigateNextSharpIcon />}
                        disabled={isUploading}
                    >
                        Next
                    </Button>
                )}
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isUploading}
            >
                <CircularProgress sx={{ color: theme.palette.primary.main, size: '3rem'}} />
            </Backdrop>
        </>
    );
};

export default Home;