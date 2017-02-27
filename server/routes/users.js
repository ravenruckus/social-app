'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../db');

// eslint-disable-next-line new-cap
const router = express.Router();

// route for invitation link
router.get('/newuser/:url', (req, res, next) => {
  const reg_url = req.params.url
  knex('users').where('reg_url', `${reg_url}`)
  console.log(reg_url);
  .then((data) => {
    if (!data) {
      throw boom.create(400, 'Bad link, User is already registred');
    }
    res.send(data);
  })
  .catch((err) => {
    next(err);
  });
})

router.post('/newuser', (req, res, next) => {
  const {
    email, password
  } = req.body;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters'));
  }

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(req.body.password, 12)
    })

  .then((hashed_password) => {
      return knex('users').insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        hashed_password: hashed_password,
        Gclass: req.body.Gclass,
        grad_date: req.body.grad_date,
        is_registred: true
      }, '*');
    })
    .then((users) => {
      const user = users[0];

      const claim = {
        user_id: user.id
      };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days' // Adds an expiration field to the payload
      });

      res.cookie('token', token, { // cookie is at the header
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // lives 7 days, if you don't include expires after you log out
        secure: router.get('env') === 'production' // forces the token only be sent as https
      });

      delete user.hashed_password;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
