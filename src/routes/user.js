'use strict';

const express = require('express');
const userRouter = express.Router();
const axios = require('axios');

const { users } = require('../models/index');
const bearer = require('../middleware/bearer');
const basic = require('../middleware/basic');

const OPENSEA_API_URL = process.env.OPENSEA_API_URL || 'https://api.opensea.io/api/v1/';


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

userRouter.post('/nft/likethis/:id', async (req, res, next) => {
  try {
    let response = await axios.get(`${OPENSEA_API_URL}/assets?order_direction=desc&offset=0&token_ids=${req.params.id}`);
    console.log(response.data.assets[0].token_id);
    // let apiResponse = { 
    //   likes: [response.data.assets[0].token_id]
    // };
    // req.body['likes'] = [response.data.assets[0].token_id];
    console.log('this is the mf reqdotbody', req.body);
    let userRecord = await users.create(req.body);
    console.log('this is mf userrec', userRecord);
    const output = {
      user: userRecord,
      userToken: userRecord.token,
    };
    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});

userRouter.post('/nft/likethis/:id', async (req, res, next) => {
  try {
    let response = await axios.get(`${OPENSEA_API_URL}/assets?order_direction=desc&offset=0&token_ids=${req.params.id}`);
    console.log(response.data.assets[0].token_id);
    // let apiResponse = { 
    //   likes: [response.data.assets[0].token_id]
    // };
    req.body['likes'] = [response.data.assets[0].token_id];
    console.log('this is the mf reqdotbody', req.body);
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

userRouter.patch('/update', async (req, res, next) => {
  try {
    let userRecord = await users.patch(req.body);
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
