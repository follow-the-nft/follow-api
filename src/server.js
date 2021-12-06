'use strict'

const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('@FollowTheNFT')
})

module.exports = {
  server: app,
  start: port => app.listen(port, console.log(`Server started on Port ${port}`))
}
