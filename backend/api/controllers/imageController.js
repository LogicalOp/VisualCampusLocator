const { fetchImage, saveImage } = require('../services/imageService');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please provide an image' });
        }

        const image = await saveImage(req.file);
        return res.status(200).json(image);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getImage = async (req, res) => {
    try {
        const image = await fetchImage();
        if (image) {
            return res.status(200).json(image);
        } else {
            return res.status(404).json({ message: 'No image found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    uploadImage,
    getImage,
};