const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

require('dotenv').config();

/**
 * Initializes and configures the Express server with necessary middleware and routes.
 * 
 * Middleware used:
 * - CORS: Enables Cross-Origin Resource Sharing.
 * - bodyParser: Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
 * - compression: Compresses response bodies for all request that traverse through the middleware.
 * 
 * Routes:
 * - '/' : Uses the routes defined in the './api/routes' module.
 * 
 * The server listens on the port specified in the environment variable `PORT`.
 * 
 * @async
 * @function prepareServer
 */
const prepareServer = async () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(compression());

    app.use('/', require('./api/routes'));

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

module.exports = {
    prepareServer
}