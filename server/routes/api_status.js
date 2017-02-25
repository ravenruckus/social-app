const router = require('express').Router()
const knex = require('../db')

router.get('/', (_req, res) => {
  knex('status')
    .orderBy('updated_at', 'desc')
    .then((rows) => {
       console.log(rows)
      res.send(rows);
    }
  )
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
})

router.patch('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('status')
    .where('id', id)
    .first()
    .then((status) => {


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
})

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('status')
    .del('*')
    .where('id', id)
    .then((rows) => {
      let status = rows[0];

      delete status.id;
      res.send(status);
    });
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('status')
    .where('id', id)
    .first()
    .then((row) => {
      res.send(row);
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
})

router.delete('/:id/likes', (req, res, next) => {
  knex('status')
    .update('likes', knex.raw('likes - 1'))
    .where({id: req.params.id})
    .then(() => knex('status').where({id: req.params.id}).first())
    .then((status) => {
      res.json({likes: status.likes})
    })
})

router.get('/', (req, res) => {
  res.send('Hi from STATUS API')
})

module.exports = router
