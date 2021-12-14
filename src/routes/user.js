'use strict';

const express = require('express');
const userRouter = express.Router();

const { users, db } = require('../models/index');
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


// Users NFT Routes ('likes')
// TODO: GET all likes
// POST: Add to likes
userRouter.post('/nft/like/:id', bearer, async (req, res, next) => {
  try {
    if(!req.params.id) { throw new Error('Please provide a valid ID');}

    // Stretch: If you already like something just unlike it.
    let userQuery = await users.findOne({ where: {username: req.body.username}})
    if(userQuery.likes.includes(req.params.id)) {
      throw new Error('nft already liked!')
    }

    // Append to existing array https://stackoverflow.com/a/44365347
    let userRecord = await users.update(
      {'likes': db.fn('array_append', db.col('likes'), req.params.id)},
      {'where': {'username': req.body.username}}
    );
    
    const output = {
      user: userRecord,
      userToken: userRecord.token,
    };

    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});
// TODO: DELETE nft like

// Users Followed Address Routes ('follows')
// TODO: Get all follows
// POST: Add to follows
userRouter.post('/address/follows/:address', bearer, async (req, res, next) => {
  try {
    if(!req.params.id) { throw new Error('Please provide a valid address');}

    // Stretch: If you already like something just unlike it.
    let userQuery = await users.findOne({ where: {username: req.body.username}})
    if(userQuery.follows.includes(req.params.address)) {
      throw new Error('nft already liked!')
    }

    // https://stackoverflow.com/a/44365347
    let userRecord = await users.update(
      {'follows': db.fn('array_append', db.col('follows'), req.params.address)},
      {'where': {'username': req.body.username}}
    );
    
    const output = {
      user: userRecord,
      userToken: userRecord.token,
    };

    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});
// TODO DELETE follows

module.exports = userRouter;
