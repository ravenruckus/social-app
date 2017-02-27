const router = require('express').Router()
const knex = require('../db')
const boom = require('boom')
const { camelizeKeys, decamelizeKeys } = require('humps')


router.get('/', (_req, res) => {
  knex('status')
    .orderBy('updated_at', 'desc')
    .then((rows) => {
       const statuses = camelizeKeys(rows)

      res.send(statuses);
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', (req, res, next) => {

  const { userId, statusUpdate, link } = req.body;
  const insertStatus = {userId};

  if(statusUpdate) {
    insertStatus.statusUpdate = statusUpdate;
  }

  if(link) {
    insertStatus.link = link;
  }

  knex('status')
    .insert(decamelizeKeys(insertStatus), '*')
    .then((rows) => {
      const status= camelizeKeys(rows[0]);
      res.send(status);
    })
    .catch((err) => {
      next(err)
    })
})

router.patch('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next()
  }

  knex('status')
    .where('id', id)
    .first()
    .then((status) => {
      if (!status)  {
        throw boom.create(404, 'Not Found')
      }


      const { statusUpdate, link } = req.body;
      const updateStatus = {};

      if(statusUpdate) {
        updateStatus.statusUpdate = statusUpdate;
      }

      if(link) {
        updateStatus.link = link;
      }
      return knex('status')
        .update(decamelizeKeys(updateStatus), '*')
        .where('id', id);
    })
    .then((rows) => {
      const status = camelizeKeys(rows[0]);

      res.send(status);
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next()
  }

  knex('status')
    .del('*')
    .where('id', id)
    .then((rows) => {
      let status = camelizeKeys(rows[0]);

      if (!status) {
        return next()
      }
      delete status.id;
      res.send(status);
    })
    .catch((err) => {
      console.log(err)
      next(err)``
    })
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('status')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found')
      }
      const status = camelizeKeys(row)
      res.send(status);
    })
    .catch((err) => {
      next(err)
    })
});

router.post('/:id/likes', (req, res, next) => {
  knex('status')
    .update('likes', knex.raw('likes + 1'))
    .where({id: req.params.id})
    .then( () => knex('status').where({id: req.params.id}).first())
    .then((status) => {
      res.json({likes: status.likes})
    })
    .catch(err => next(err))
})

router.delete('/:id/likes', (req, res, next) => {
  knex('status')
    .update('likes', knex.raw('likes - 1'))
    .where({id: req.params.id})
    .then(() => knex('status').where({id: req.params.id}).first())
    .then((status) => {
      res.json({likes: status.likes})
    })
    .catch(err => next(err))
})

router.get('/:statusId/comments', (req, res, next) => {
  const statusId = Number.parseInt(req.params.statusId)

  if (Number.isNaN(statusId)) {
    return next()
  }

  knex('status_comments')
    .where('status_id', statusId)
    .then((rows) => {
      if(!rows) {
        throw boom.create(404, 'Not Found')
      }
      const comments = camelizeKeys(rows)
      res.send(comments)
    })
})


router.post('/:statusId/comments', (req, res, next) => {

  const {statusComment, userId } = req.body;
  const statusId = req.params.statusId

  const insertComment = { statusComment, userId, statusId}

  knex('status_comments')
    .insert(decamelizeKeys(insertComment), '*')
    .then((rows) => {
      const statusComment = camelizeKeys(rows[0])
      res.send(statusComment)
    })
    .catch(err => next(err))
})

router.delete('/:statusId/comments/:id', (req, res, next) => {
  const commentId = Number.parseInt(req.params.id)

  if (Number.isNaN(commentId)) {
    return next()
  }

    knex('status_comments')
      .del('*')
      .where('id', commentId)
      .then((rows) => {
        const comment = rows[0]

        if (!comment) {
          return next()
        }

        delete comment.id
        res.send(camelizeKeys(comment))
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
})

router.patch('/:statusId/comments/:id', (req, res, next) => {
  const commentId = Number.parseInt(req.params.id)

  if (Number.isNaN(commentId)) {
    return next()
  }

  knex('status_comments')
    .where('id', commentId)
    .first()
    .then((comment) => {
      if (!comment) {
        throw boom.create(404, 'Not Found')
      }

      const statusComment = req.body
      const updateComment = statusComment

      return knex('status_comments')
        .update(decamelizeKeys(updateComment), '*')
        .where('id', commentId)
    })
    .then((rows) => {
      const comment = camelizeKeys(rows[0])

      res.send(comment)
    })
    .catch((err) => {
      next(err)
    })
})


router.get('/', (req, res) => {
  res.send('Hi from STATUS API')
})

module.exports = router
