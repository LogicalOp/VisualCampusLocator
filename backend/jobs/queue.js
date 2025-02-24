const { Queue, QueueEvents } = require('bullmq');
const redisClient = require('../config/redis');

// Queue Initialization
const imageProcessingQueue = new Queue('image-processing', { connection: redisClient });

// Queue Events
const imageProcessingQueueEvents = new QueueEvents('image-processing', {
    connection: redisClient
});

module.exports = {
    imageProcessingQueue,
    imageProcessingQueueEvents
};