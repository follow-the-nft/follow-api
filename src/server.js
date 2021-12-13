'use strict';

// Import express
const express = require('express');
// Import cors
const cors = require('cors')

// Import middleware and routes
const errorHandler = require('./handlers/error');
const notFoundHandler = require('./handlers/not-found');
const publicRoutes = require('./routes/public');
const userRoutes = require('./routes/user');

// Prepare express
const app = express();

// App middleware
app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('@FollowTheNFT');
});

app.get('/bad', (req, res, next) => {
  next("you've messed up");
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
