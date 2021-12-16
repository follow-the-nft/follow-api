'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user');
const likeModel = require('./likes');
const followModel = require('./follows');

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' 
  : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' 
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  likes: likeModel(sequelize, DataTypes),
  follows: followModel(sequelize, DataTypes)
};
