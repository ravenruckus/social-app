const router = require('express').Router()
const knex = require('../db')

router.get('/users', (req, res) => {
  knex('users')
    .then((response) => {

      res.send(response);

    })

})

router.get('/test', (req, res) => {
  res.send('Hi from API')
})

module.exports = router
