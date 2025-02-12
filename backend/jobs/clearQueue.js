const { Queue } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis({
    maxRetriesPerRequest: null,
});

const imageQueue = new Queue('image-processing', { connection });

const clearQueue = async () => {
    try {
        await imageQueue.drain();
        console.log('Queue cleared successfully');
    } catch (error) {
        console.error('Error clearing queue:', error);
    } finally {
        await connection.quit();
    }
};

clearQueue();