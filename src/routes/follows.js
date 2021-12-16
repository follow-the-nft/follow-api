'use strict';

const express = require('express');
const followRouter = express.Router();

const { Op } = require('sequelize');
const { follows, users } = require('../models/index');
const bearer = require('../middleware/bearer');

// GET: address followed by users ('follows')
followRouter.get('/newFollows', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let allFollows = await follows.findAll({ where: { user_id: user.dataValues.id }});
    res.status(200).json(allFollows);
  } catch(e) {
    console.error(e.message);
  } finally {
    next();
  }
});

followRouter.post('/newFollows/:address', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let record = await follows.findAll({
      where: {
        [Op.and]: [
          { user_id: user.id },
          { contract_address: req.params.address }
        ]
      }
    });

    let result; 
    if(!record.length) {
      req.follow = {};
      req.follow.user_id = user.id;
      req.follow.contract_address = req.params.address;
      result = await follows.create(req.follow);
    } else {
      result = record[0];
    }
    
    res.status(200).json(result);
  } catch(e) {
    console.error(e.message);
  } finally {
    next();
  }
});

followRouter.delete('/newFollows/:address/', bearer, async (req, res, next) => {
  try {
    let user = await users.findOne({ where: {username: req.user.dataValues.username}});
    let record = await follows.findAll({
      where: {
        [Op.and]: [
          { user_id: user.id },
          { contract_address: req.params.address },
        ]
      }
    });
    
    let result = follows.destroy({ where: {id: record[0].id}});
    res.status(204).json(result);
  } catch(e) {
    console.error(e.message);
  } finally {
    next();
  }
});



module.exports = followRouter;
