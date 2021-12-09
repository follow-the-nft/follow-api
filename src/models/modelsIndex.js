'use strict'

const { Sequelize, DataTypes } = require('sequelize')
const investorModel = require('./investor.js')
const Collection = require('./data-collection.js')
const userModel = require('./users.js')

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:'

const sequelize = new Sequelize(DATABASE_URL)
const investor = investorModel(sequelize, DataTypes)


module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  investor: new Collection(investor),

}
