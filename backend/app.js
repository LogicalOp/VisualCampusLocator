const server = require('./server');
const database = require('./database');
const logger = require('./config/logger');
const redisClient = require('./config/redis');
const startWorker = require('./jobs/worker');

const startApp = async () => {
    try {
        await database.connect();
        await server.prepareServer();
        await startWorker();

        logger.info('Application started successfully');
    } catch(err) {
        logger.error(`Failed to start the application: ${err}`);
        process.exit(1);
    }
};

startApp();