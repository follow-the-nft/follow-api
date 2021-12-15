'use strict';

const express = require('express');
const likeRouter = express.Router();

const { Op } = require('sequelize');
const { likes, users } = require('../models/index');
const bearer = require('../middleware/bearer');

// GET: Users liked NFTs ('likes')
likeRouter.get('/newLikes', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let allLikes = await likes.findAll({ where: { user_id: user.dataValues.id }})
    res.status(200).json(allLikes)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
});

likeRouter.post('/newlikes/:address/:id', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let record = await likes.findAll({
      where: {
        [Op.and]: [
          { user_id: user.id },
          { contract_address: req.params.address },
          { token_id: req.params.id }
        ]
      }
    });

    let result 
    if(!record.length) {
      req.like = {}
      req.like.user_id = user.id
      req.like.contract_address = req.params.address
      req.like.token_id = req.params.id
      result = await likes.create(req.like)
    } else {
      result = record[0]
    }
    
    res.status(200).json(result)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
});

likeRouter.delete('/newlikes/:address/:id', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let record = await likes.findAll({
      where: {
        [Op.and]: [
          { user_id: user.id },
          { contract_address: req.params.address },
          { token_id: req.params.id }
        ]
      }
    });
    
    let result = likes.destroy({ where: {id: record[0].id}})
    res.status(204).json(result)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
});

module.exports = likeRouter;