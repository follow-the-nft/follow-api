'use strict';

const express = require('express');
const userRouter = express.Router();

const { users } = require('../models/index');
const bearer = require('../middleware/bearer');
// const { acl } = require('../middleware/acl')

// GET User - User Reads 
userRouter.get('/user', bearer, async(req, res) => {
  const user = await users.findOne({ where: {username: req.user.username}});
  res.status(200).json(user);
});


module.exports = userRouter;
