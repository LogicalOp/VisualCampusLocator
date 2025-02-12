const { Queue } = require('bullmq');
const redisClient = require('../config/redis');

// Queue Initialization
const imageProcessingQueue = new Queue('image-processing', { connection: redisClient });
const imageUploadQueue = new Queue('image-upload', { connection: redisClient });

module.exports = {
    imageProcessingQueue,
    imageUploadQueue,
};