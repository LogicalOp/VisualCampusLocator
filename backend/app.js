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
const prepare = async () => {
    await database.prepareDatabase();
    await server.prepareServer();
};

prepare();