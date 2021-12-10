'use strict';

// Import express
const express = require('express');

// Import middleware and routes
const errorHandler = require('./handlers/error-handler');
const publicRoutes = require('./routes/public');
const userRoutes = require('./routes/user');

// Prepare the express app
const app = express();

// App level middleware
app.use(express.json());
app.use(errorHandler);

// Proof of life route
app.get('/', (req, res) => {
  res.status(200).send('@FollowTheNFT');
});

// Routes
app.use(publicRoutes);
app.use(userRoutes);

// Handlers TODO

module.exports = {
  server: app,
  start: port => app.listen(port, console.log(`Server started on Port ${port}`))
};
