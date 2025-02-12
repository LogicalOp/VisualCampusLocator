const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const logger = require('./config/logger');


const PORT = process.env.PORT || 3000;

const prepareServer = () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', routes);

    app.get('/', (req, res) => {
        res.json({ message: 'Hello World' });
    });

    const server = app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });

    process.on('SIGINT', () => {
        logger.warn('Shutting down server...');
        server.close(() => {
            logger.info('Server shut down gracefully');
            process.exit(0);
        });
    });

    return server;
};

module.exports = { prepareServer };