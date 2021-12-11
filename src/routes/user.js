'use strict';

const express = require('express');
const userRouter = express.Router();

const { users } = require('../models/index');
const bearer = require('../middleware/bearer');
const basic = require('../middleware/basic');

// GET User - User Reads 
userRouter.get('/user', async(req, res) => {
  const userData = await users.findOne({ where: {username: req.body.username}});
  res.status(200).json(userData);
});
 
userRouter.get('/userBearer', bearer, async(req, res) => {
  const user = await users.findOne({ where: {username: req.body.username}});
  res.status(200).json(user);
});

userRouter.get('/userBasic', basic, async(req, res) => {
  const user = await users.findOne({ where: {username: req.body.username}});
  res.status(200).json(user);
});

userRouter.post('/register', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      userToken: userRecord.token,
    };
    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});

module.exports = userRouter;
