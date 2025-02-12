const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./api/routes');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

const prepareServer = () => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/api', routes);

    app.get('/', (req, res) => {
        res.json({ message: 'Hello World' });
    });

    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    process.on('SIGINT', () => {
        console.log('Stopping server');
        server.close(() => {
            console.log('Server stopped');
        });
    });

    return server;
};

module.exports = { prepareServer };