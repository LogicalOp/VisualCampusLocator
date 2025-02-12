const Redis = require('ioredis');
const logger = require('./logger');

const redisClient = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
});

// Event listners for logging and error handling
redisClient.on('connect', () => {
    logger.info('Connected to Redis');
});
redisClient.on('error', (error) => {
    logger.error(`Redis error: ${error}`);
});

module.exports = redisClient;