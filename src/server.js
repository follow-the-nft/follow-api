'use strict';

// Import express
const express = require('express');

// Import middleware and routes
const errorHandler = require('./handlers/error');
const notFoundHandler = require('./handlers/not-found');
const publicRoutes = require('./routes/public');
const userRoutes = require('./routes/user');
const handle404 = require('./error-handlers/404')
const error500Handler = require('./error-handlers/500')

// Prepare express
const app = express();

// App middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('@FollowTheNFT');
});

app.use(publicRoutes);
app.use(userRoutes);

// Route middleware
app.use(errorHandler);
app.use('*', notFoundHandler);

// Handlers TODO

module.exports = {
  server: app,
  start: port => app.listen(port, console.log(`Server started on Port ${port}`))
};
