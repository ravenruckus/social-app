const router = require('express').Router()
const knex = require('../db')
const boom = require('boom')
const { camelizeKeys, decamelizeKeys } = require('humps')


router.get('/timeline', (req, res) => {
  knex('status')
    .orderBy('updated_at', 'desc')
    .then((rows) => {
      const timeline = camelizeKeys(rows)
      knex('projects')
        .orderBy('updated_at', 'desc')
        .then((projectRows) => {
          const combined = timeline.concat(camelizeKeys(projectRows))
          console.log(combined)
          combined.sort(function (a, b) {
            return b.updatedAt - a.updatedAt
          })
          res.send(combined)
        })
    })
})



router.get('/test', (req, res) => {
  res.send('Hi from API')
})

module.exports = router
