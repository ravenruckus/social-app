const router = require('express').Router()
const knex = require('../db')

router.get('/', (req, res) => {
  res.send('Hi from STATUS API')
})

module.exports = router
