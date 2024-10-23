import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    function handleUpload(event) {
        console.log(event.target.files[0]);
        setImage((URL.createObjectURL(event.target.files[0])));
    }
    return (
        <>
            <h1>Home</h1>
            <Box
                component="img"
                sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt=""
                src={image}
            />
            <br />
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUpload}
                    multiple
                />
            </Button>
        </>
    );
};

export default Home;