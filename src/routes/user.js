'use strict';

const express = require('express');
const userRouter = express.Router();

const { users, db } = require('../models/index');
const bearer = require('../middleware/bearer');

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
    if(!req.params.id && typeof req.params.id !== 'string') { throw new Error('Please provide a valid ID');}

    // Remove & Append to existing array https://stackoverflow.com/a/44365347
    let userQuery = await users.findOne({ where: {username: req.body.username}});
    let userRecord;
    if(userQuery.likes.includes(req.params.id)) {
      userRecord = await users.update(
        {'likes': db.fn('array_remove', db.col('likes'), req.params.id)},
        {'where': {'username': req.body.username}}
      );
    } else {
      userRecord = await users.update(
        {'likes': db.fn('array_append', db.col('likes'), req.params.id)},
        {'where': {'username': req.body.username}}
      );
    }

    res.status(201).json({updatedLikes: userRecord});
  } catch (err) {
    next(err.message);
  }
});

// Users Followed Address Routes ('follows')
// TODO: Get all follows

// POST: Add to follows
userRouter.post('/address/follow/:address', bearer, async (req, res, next) => {
  try {
    if(!req.params.address && typeof req.params.address !== 'string') { throw new Error('Please provide a valid address');}

    let userQuery = await users.findOne({ where: {username: req.body.username}});
    let userRecord;
    if(userQuery.follows.includes(req.params.address)) {
      userRecord = await users.update(
        {'follows': db.fn('array_remove', db.col('follows'), req.params.address)},
        {'where': {'username': req.body.username}}
      );
    } else {
      userRecord = await users.update(
        {'follows': db.fn('array_append', db.col('follows'), req.params.address)},
        {'where': {'username': req.body.username}}
      );
    }

    res.status(201).json({updatedFollows: userRecord});
  } catch (err) {
    next(err.message);
  }
});

module.exports = userRouter;
