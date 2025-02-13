const { Worker } = require('bullmq');
const redisClient = require('../config/redis');
const logger = require('../config/logger');
const { computeSimilarity } = require('../api/services/pythonServices');

const startWorker = async () => {
    const worker = new Worker('image-processing', async (job) => {
        try {
            logger.info(`Processing started for: ${job.data.filePath}`);

            // Run Python script to extract descriptors
            const descriptors = await computeSimilarity(job.data.filePath, job.data.secureUrl);

            logger.info(`Processing completed for: ${job.data.filePath}`);
        } catch (error) {
            logger.error('Processing failed:', error);
        }
    }, { connection: redisClient });

    worker.on('completed', (job) => {
        logger.info(`Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
        logger.error(`Job ${job.id} failed: ${err.message}`);
    });

    logger.info('Worker started successfully');
};

module.exports = startWorker;