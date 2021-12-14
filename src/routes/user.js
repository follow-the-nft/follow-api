'use strict';

const express = require('express');
const userRouter = express.Router();

const { users, db } = require('../models/index');
const bearer = require('../middleware/bearer');

// GET User - User Reads
// TODO: Return back all created Users
userRouter.get('/users', async(req, res) => {
  try {
    const userData = await users.findOne({ where: {username: req.body.username}});
    res.status(200).json(userData);
  } catch (e) {
    console.error('user likes Error');
  }
});

// Returns an Array of Likes or a string on an empty array
// Done: GET all likes
userRouter.get('/user/likes', bearer, async(req, res) => {
  try {
    const user = await users.findOne({ where: {username: req.body.username}});
    let results = user.dataValues.likes;
    if(results !== []) res.status(200).send('You do not have anything liked in here!');
    res.status(200).json(results);
  } catch (e) {
    console.error('user likes Error');
  }
});

// Returns an Array of Follows or a string on an empty array
// Done: Get all follows
userRouter.get('/user/follows', bearer, async(req, res) => {
  try {
    const user = await users.findOne({ where: {username: req.body.username}});
    let results = user.dataValues.follows;
    if(results !== []) res.status(200).send('You do not followed anything liked in here!');
    res.status(200).json(results);
  } catch (e) {
    console.error(e, 'user likes Error');
  }
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

// POST: Add to likes
userRouter.post('/nft/like/:id', bearer, async (req, res, next) => {
  try {
    if(!req.params.id) { throw new Error('Please provide a valid ID');}

    // Stretch: If you already like something just unlike it.
    let userQuery = await users.findOne({ where: {username: req.body.username}});
    console.log('userQuery:', userQuery);
    if(userQuery.likes.includes(req.params.id)) {
      throw new Error('nft already liked!');
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

// Users Followed Address Routes ('follows')
// POST: Add to follows
userRouter.post('/address/follows/:address', bearer, async (req, res, next) => {
  try {
    if(!req.params.id) { throw new Error('Please provide a valid address');}

    // Stretch: If you already like something just unlike it.
    let userQuery = await users.findOne({ where: {username: req.body.username}});
    if(userQuery.follows.includes(req.params.address)) {
      throw new Error('nft already liked!');
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

module.exports = userRouter;
