const express = require('express');

const middleware = require('./middlewares');

const routes = require('./routes')

const app = express();

// middleware
middleware(app);

// routes
routes(app);

module.exports = app;