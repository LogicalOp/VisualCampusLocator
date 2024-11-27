import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Button, Box, Stack, CircularProgress, Backdrop, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CampusMap from "../components/CampusMap";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from '@mui/icons-material/Search';
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const Home = () => {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [longitude, setLongitude] = useState(-6.60037);
    const [latitude, setLatitude] = useState(53.38392);
    const [building, setBuilding] = useState();
    const theme = useTheme();
    // const navigate = useNavigate();

    function handleUpload(event) {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit() {
        if (!image) {
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch("http://localhost:3000/image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("Failed to upload image");
                return;
            }

            const result = await response.json();
            console.log(result);
            // Navigate to the next page with results (Building name, Coordinates) (Unfinished)
            // This is the old structure thinking of changing to a 50/50 page split between upload and map
            // Have to review if i prefer this layout. 
            // setLongitude
            // setLatitude
            setBuilding("John Hume Building");
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                p: 1,
                m: 1,
                borderRadius: 1,
                marginTop: '64px',
                height: '90vh',
            }}
        >
            <Box
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    width: "47vw",
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {preview && !building && (
                        <Box
                            component="img"
                            sx={{
                                height: 900,
                                width: 900,
                                maxHeight: { xs: 233, md: 167, lg: 500 },
                                maxWidth: { xs: 350, md: 250, lg: 550 },
                                alignItems: "center",
                                display: "flex",
                                margin: "auto",
                                marginBottom: "2vh",
                            }}
                            alt=""
                            src={preview}
                        />
                    )}
                    <br />
                    <Stack spacing={4} direction="row">
                        {image && !building && (
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                color="error"
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
                        {!building && (
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
                        )}
                        {image && !building && (
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                onClick={handleSubmit}
                                endIcon={<SearchIcon />}
                                disabled={isUploading}
                            >
                                Locate
                            </Button>
                        )}
                    </Stack>
                    {building && (
                        <h1>Result</h1>
                    )}
                    <Backdrop
                        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isUploading}
                    >
                        <CircularProgress
                            sx={{ color: theme.palette.primary.main, size: "3rem" }}
                        />
                    </Backdrop>
                </Box>
            </Box>
            <Box
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    width: "47vw",
                    flexGrow: 1,
                }}
            >
                <Box sx={{
                    height: 400,
                    width: 650,
                    maxHeight: { xs: 400, md: 850 },
                    maxWidth: { xs: 400, md: 650 },
                    alignItems: 'center',
                    display: 'flex',
                    margin: 'auto',
                    marginBottom: '25vh',
                }}>
                    <CampusMap longitude={longitude} latitude={latitude} building={building} />
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
