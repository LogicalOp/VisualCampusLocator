const express = require('express');

const images = require('./routes/image');

const router = express.Router();

router.use('/image', images);

module.exports = router;