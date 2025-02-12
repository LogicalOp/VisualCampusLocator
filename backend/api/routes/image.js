const express = require('express');
const multer = require('multer');
const { uploadImage, getImage } = require('../controllers/imageController');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), uploadImage);

module.exports = router;