const express = require('express');
const multer = require('multer');
const { uploadImage, getImageById } = require('../controllers/imageController.js');
const router = express.Router();

/**
 * Initializes a memory storage engine for multer.
 * This storage engine stores the files in memory as Buffer objects.
 * 
 * @type {multer.StorageEngine}
 */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * POST /image
 * 
 * Uploads a single image file to the server.
 */
router.post('/', upload.single('file'), uploadImage);

/**
 * GET /image/:id
 * 
 * Retrieves an image by ID.
 */
router.get('/:id', getImageById);

module.exports = router;