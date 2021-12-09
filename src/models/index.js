'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
// const userModel;
const nft = require('./nft-model.js');
const Collection = require('./collection-class.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

const sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {}

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const nftModel = nft(sequelize, DataTypes)

const nftCollection = new Collection(nftModel);

module.exports = {
  db: sequelize,
  nft: nftCollection
}

