'use strict';

const express = require('express');
const fetch = require('node-fetch');
const userRouter = express.Router();

const { users, db } = require('../models/index');
const bearer = require('../middleware/bearer');
const basic = require('../middleware/basic');

const OPENSEA_API_URL = process.env.OPENSEA_API_URL || 'https://api.opensea.io/api/v1';

// POST: Register
userRouter.post('/register', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord
    };
    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});

// POST: Sign-in
userRouter.post('/sign-in', basic, async (req, res, next) => {
  try {
    const user = {
      username: req.user.username,
      userToken: req.user.token,
      id: req.user.id
    };
    res.status(200).json(user);
  } catch (error) {
    next(error.message);
  }
});


// GET: Users liked NFTs ('likes')
userRouter.get('/likes', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let likeResponse = [];
    // https://api.opensea.io/api/v1/asset/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/2/
    for(const like of user.likes) {
      let likeValues = like.split(',');
      let response = await fetch(`${OPENSEA_API_URL}/asset/${likeValues[0]}/${likeValues[1]}`);
      const json = await response.json();
      likeResponse.push(json);
    }
    res.status(200).json(likeResponse);
  } catch (err) {
    next(err);
  }
});

// POST: Add to users liked NFTs ('likes/:id')
userRouter.post('/likes/:address/:id', bearer, async (req, res, next) => {
  try {
    if(!req.params.id && typeof req.params.id !== 'string') { throw new Error('Please provide a valid ID');}

    // TODO: cleanup and assign to variable for reuse
    // let index = `${req.params.address},${req.params.id}`
    let userQuery = await users.findOne({ where: {username: req.user.dataValues.username}});
    let userRecord;
    console.log(userQuery.likes);
    if(userQuery.likes.includes(`${req.params.address},${req.params.id}`)) {
      userRecord = await users.update(
        {'likes': db.fn('array_remove', db.col('likes'), `${req.params.address},${req.params.id}`)},
        {'where': {'username': req.user.dataValues.username}}
      );
    } else {
      userRecord = await users.update(
        {'likes': db.fn('array_append', db.col('likes'), `${req.params.address},${req.params.id}`)},
        {'where': {'username': req.user.dataValues.username}}
      );
    }
    res.status(201).json({updatedLikes: userRecord});
  } catch (err) {
    next(err.message);
  }
});

// GET: Users followed addresses ('follows')
userRouter.get('/follows', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let followResponse = [];
    // Do we want to want the follow response to be an array of asset objects?
    for(const address of user.follows) {
      let response = await fetch(`${OPENSEA_API_URL}/assets?owner=${address}&order_direction=desc&offset=0`);
      const json = await response.json();
      followResponse.push(json);
    }
    res.status(200).json(followResponse);
  } catch (err) {
    next(err);
  }
});

// POST: Add to users follows addresses ('follow')
userRouter.post('/follows/:address', bearer, async (req, res, next) => {
  try {
    if(!req.params.address && typeof req.params.address !== 'string') { throw new Error('Please provide a valid address');}

    let userQuery = await users.findOne({ where: {username: req.user.dataValues.username}});
    let userRecord;
    if(userQuery.follows.includes(req.params.address)) {
      userRecord = await users.update(
        {'follows': db.fn('array_remove', db.col('follows'), req.params.address)},
        {'where': {'username': req.user.dataValues.username}}
      );
    } else {
      userRecord = await users.update(
        {'follows': db.fn('array_append', db.col('follows'), req.params.address)},
        {'where': {'username': req.user.dataValues.username}}
      );
    }
    res.status(201).json({updatedFollows: userRecord});
  } catch (err) {
    next(err.message);
  }
});

module.exports = userRouter;
