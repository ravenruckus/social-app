const router = require('express').Router()
const knex = require('../db')

router.get('/status', (_req, res) => {
  knex('status')
    .orderBy('updated_at', 'desc')
    .then((rows) => {
       console.log(rows)
      res.send(rows);
    }
  )
})

router.get('/', (req, res) => {
  res.send('Hi from STATUS API')
})

module.exports = router
