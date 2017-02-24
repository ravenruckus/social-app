const router = require('express').Router()
const knex = require('../db')

router.get('/', (req, res) => {
  res.send('Hi from Projects API!')
})

module.exports = router
