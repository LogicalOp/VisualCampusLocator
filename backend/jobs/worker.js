const { Worker } = require('bullmq');
const Redis = require('ioredis');
const { computeSimilarity } = require('../api/services/pythonServices');

const connection = new Redis({
    maxRetriesPerRequest: null,
});

const worker = new Worker('image-processing', async (job) => {
    try {
        console.log(`Processing image: ${job.data.filePath}`);

        // Run Python script to extract descriptors
        const descriptors = await computeSimilarity();

        // For now, just log the descriptors
        console.log(`Descriptors: ${descriptors}`);

        console.log(`Processing completed for: ${job.data.filePath}`);
    } catch (error) {
        console.error('Processing failed:', error);
    }
}, { connection });

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
});