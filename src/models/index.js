'use strict'

require('dotenv').config()
const { Sequelize} = require('sequelize')

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

const sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {}

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)

module.exports = {
  db: sequelize
}

