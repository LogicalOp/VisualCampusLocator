const { fetchImage, uploadToCloud } = require('../services/imageService');
const { imageProcessingQueue, imageProcessingQueueEvents } = require('../../jobs/queue');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please provide an image' });
        }

        const image = await uploadToCloud(req.file);

        const job = await imageProcessingQueue.add('image-processing', {
            secureUrl: image.result.secure_url,
            filePath: image.imgPath.filePath
        });

        // Wait for the job to complete using QueueEvents
        const result = await new Promise((resolve, reject) => {
            imageProcessingQueueEvents.on('completed', ({ jobId, returnvalue }) => {
                if (jobId === job.id) {
                    resolve(returnvalue);
                }
            });

            imageProcessingQueueEvents.on('failed', ({ jobId, failedReason }) => {
                if (jobId === job.id) {
                    reject(new Error(failedReason));
                }
            });
        });

        return res.status(200).json({
            message: 'Image uploaded successfully and processing completed',
            filePath: image.imgPath.filePath,
            cloud_url: result.cloud_url,
            location_name: result.filename, // Ensure this matches the key returned by the worker
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