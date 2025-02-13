const cloudinary = require('../../config/cloudinary');
const logger = require('../../config/logger');
const { getImage, saveImage } = require('../dao/imageDao');

const fetchImage = async () => {
    return await getImage();
};

const uploadToCloud = async (file) => {
    try {
        if (!file) {
            logger.error('No file provided.');
            throw new Error('No file provided.');
        }

         const imgPath = await saveImage(file);

        // Upload to Cloudinary using the buffer
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'campus_images',
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) {
                        logger.error(`Error uploading image to Cloudinary: ${error}`);
                        return reject(error);
                    }
                    logger.info(`Uploaded to Cloudinary: ${result.secure_url}`);
                    resolve(result);
                }
            );
            uploadStream.end(file.buffer);
        });

        return { result, imgPath };
    } catch (error) {
        logger.error(`Error uploading image to cloud: ${error}`);
        throw error;
    }
};

module.exports = {
    fetchImage,
    uploadToCloud,
};