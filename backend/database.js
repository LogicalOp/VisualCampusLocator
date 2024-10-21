const database = {
    knex: null,
};

/**
 * Prepares the database connection using Knex.js with PostgreSQL client.
 * 
 * This function initializes the `knex` instance with the specified connection
 * details including user, password, host, database, and port.
 * 
 * @async
 * @function prepareDatabase
 * @returns {Promise<void>} A promise that resolves when the database connection is prepared.
 */
const prepareDatabase = async () => {
    database.knex = require('knex')({
        client: 'pg',
        connection: {
            user: 'postgres',
            password: 'postgres',
            host: 'localhost',
            database: 'postgres',
            port: 5432,
        }
    });
};

database.prepareDatabase = prepareDatabase;

module.exports = database;