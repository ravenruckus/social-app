const router = require('express').Router()
const knex = require('../db')
const boom = require('boom')


router.get('/', (_req, res) => {
  knex('status')
    .orderBy('updated_at', 'desc')
    .then((rows) => {
       console.log(rows)
      res.send(rows);
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', (req, res, next) => {

  const { user_id, status_update, link } = req.body;
  const insertStatus = {user_id};

  if(status_update) {
    insertStatus.status_update = status_update;
  }

  if(link) {
    insertStatus.link = link;
  }

  knex('status')
    .insert(insertStatus, '*')
    .then((rows) => {
      const status= rows[0];
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


      const { status_update, link } = req.body;
      const updateStatus = {};

      if(status_update) {
        updateStatus.status_update = status_update;
      }

      if(link) {
        updateStatus.link = link;
      }
      return knex('status')
        .update(updateStatus, '*')
        .where('id', id);
    })
    .then((rows) => {
      const status = rows[0];

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
      let status = rows[0];

      if (!status) {
        return next()
      }
      delete status.id;
      res.send(status);
    })
    .catch((err) => {
      console.log(err)
      next(err)
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
      res.send(row);
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

// router.get('/:status_id/comments')
//   knex('status_comments')
//     .insert({status_id: status_id, user_id: user_id, status: status })

router.get('/', (req, res) => {
  res.send('Hi from STATUS API')
})

module.exports = router
