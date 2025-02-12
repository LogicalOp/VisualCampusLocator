const knex = require('knex');
const config = require('./config/database');

const database = {
    knex: null,

    async connect() {
        try {
            if (!this.knex) {
                this.knex = knex({
                    client: 'pg',
                    connection: config.postgres
                });

                console.log('Database connected');
            }
        } catch (error) {
            console.error('Database connection error', error);
            process.exit(1);
        }
    },

    async disconnect() {
        try {
            if (this.knex) {
                await this.knex.destroy();
                console.log('Database disconnected');
            }
        } catch (error) {
            console.error('Database disconnection error', error);
        }
    }
};

process.on('SIGINT', async () => {
    console.log('Disconnecting database');
    await database.disconnect();
    process.exit(0);
});

module.exports = database;