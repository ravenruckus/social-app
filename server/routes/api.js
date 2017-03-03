const router = require('express').Router()
const knex = require('../db')
const boom = require('boom')
const { camelizeKeys, decamelizeKeys } = require('humps')


// router.get('/timeline', (req, res) => {
//   knex('status')
//     .orderBy('updated_at', 'desc')
//     .then((rows) => {
//       const timeline = camelizeKeys(rows)
//       knex('projects')
//         .orderBy('updated_at', 'desc')
//         .then((projectRows) => {
//           const combined = timeline.concat(camelizeKeys(projectRows))
//           console.log(combined)
//           combined.sort(function (a, b) {
//             return b.updatedAt - a.updatedAt
//           })
//           res.send(combined)
//         })
//     })
//     .catch((err) => {
//       next(err)
//     })
// })



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
    .catch((err) => {
      next(err)
    })
})



router.get('/', (_req, res, next) => {
  knex('projects')
    .select(
      'projects.id',
      'users.id as user_id',
      'users.last_name as user_last_name',
      'users.first_name as user_first_name',
      'projects.title',
      'projects.description',
      'projects.img_url',
      'projects.web_url',
      'projects.github_link',
      'projects.github_readme',
      'projects.likes',
      'projects.created_at',
      'projects.updated_at'
    )
    .orderBy('projects.updated_at', 'ASC')
    .innerJoin('users', 'projects.user_id', 'users.id')
    .then((projects) => {
      const responseData = camelizeKeys(projects)

      res.send(responseData);

    })
    .catch((err) => {
      console.error(err);
      return next(boom.create(500, 'from api projects get request'))
    })
})




router.get('/test', (req, res) => {
  res.send('Hi from API')
})

module.exports = router
