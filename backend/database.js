const knex = require('knex');
const config = require('./config/database');
const logger = require('./config/logger');

const database = {
    knex: null,

    async connect() {
        try {
            if (!this.knex) {
                this.knex = knex({
                    client: 'pg',
                    connection: config.postgres
                });

                logger.info('Database connection established.')
            }
        } catch (error) {
            logger.error(`Database connection error: ${error}`);
            process.exit(1);
        }
    },

    async disconnect() {
        try {
            if (this.knex) {
                await this.knex.destroy();
                logger.info('Database connection terminated.');
            }
        } catch (error) {
            logger.error(`Database disconnection error: ${error}`);
        }
    }
};

process.on('SIGINT', async () => {
    logger.warn('Database disconnecting...');
    await database.disconnect();
    process.exit(0);
});

module.exports = database;