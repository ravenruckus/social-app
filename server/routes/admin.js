'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../db');

// eslint-disable-next-line new-cap
const router = express.Router();

// route to create invitation to users
router.post('/admin/newusers', (req, res, next) => {
  const {
    email, first_name, last_name, is_admin
  } = req.body;

  if (!is_admin) {
    return next(boom.create(400, 'Admin status must not be blank'));
  }
  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }
  const emailJSON = JSON.stringify(email);
  const reg_url = Buffer.from(emailJSON, 'utf8').toString('base64');

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }
      return bcrypt.hash(reg_url, 8)
    })
    .then((reg_url) => {
      return knex('users').insert({
        email,
        first_name,
        last_name,
        is_admin,
        reg_url,
        is_registred: false
      }, '*');
    })
    .then((users) => {
      const user = users[0];

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/admin/users', (req, res, next) => {
  knex('users')
    .orderBy('email')
    .then((users) => {;
      res.send(users);
    })
    .catch((err) => {
      // console.error(err);
      next(err);
    });
});


module.exports = router;
