const server = require('./server');
const database = require('./database');

/**
 * Prepares the application by initializing the database and server.
 * 
 * This function is asynchronous and will wait for the database and server
 * preparation to complete before resolving.
 * 
 * @async
 * @function prepare
 * @returns {Promise<void>} A promise that resolves when the preparation is complete.
 */
const startApp = async () => {
    try {
        await database.connect();
        await server.prepareServer();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};

startApp();