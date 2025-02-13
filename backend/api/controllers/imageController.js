const { fetchImage, uploadToCloud } = require('../services/imageService');
const imageQueue = require('../../jobs/queue').imageProcessingQueue;

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please provide an image' });
        }

        const image = await uploadToCloud(req.file);

        await imageQueue.add('image-processing', {
            secureUrl: image.result.secure_url,
            filePath: image.imgPath.filePath
        });

        return res.status(200).json({
            message: 'Image uploaded successfully and processing started',
            filePath: image.filePath
        });
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