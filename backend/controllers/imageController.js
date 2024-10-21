const database = require('../database');

/**
 * POST /image
 * 
 * Uploads a single image file to the server.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.file - The uploaded file object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - Details of the uploaded file.
 * @returns {Object} 400 - Error message if no file is provided.
 * @returns {Object} 500 - Error message if an internal server error occurs.
 */
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please provide an image' });
        }

        const { originalname, mimetype, buffer } = req.file;

        const [image] = await database.knex('images')
            .insert({
                originalname,
                mimetype,
                data: buffer
            })
            .returning('*');

        return res.status(200).json(image);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /image/:id
 * 
 * Retrieves an image by ID.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - The image file.
 * @returns {Object} 404 - Error message if the image is not found.
 * @returns {Object} 500 - Error message if an internal server error occurs.
 */
const getImageById = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await database.knex('images')
            .select('originalname', 'mimetype', 'data')
            .where({ id })
            .first();

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.setHeader('Content-Disposition', `inline; filename="${image.originalname}"`);
        res.setHeader('Content-Type', image.mimetype);
        return res.status(200).send(image.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    uploadImage,
    getImageById
};