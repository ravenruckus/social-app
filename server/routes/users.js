'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../db');

// eslint-disable-next-line new-cap
const router = express.Router();

// route from invitation link
router.get('/newuser/:url', (req, res, next) => {
  const reg_url = req.params.url
  knex('users')
    .where('reg_url', `${reg_url}`)
    .then((data) => {
      const user = data[0];

      if (user.is_registred) {
        throw boom.create(400, 'Bad link, User is already registred');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
})

//route for updating(creating) user from user side
router.patch('/newuser', (req, res, next) => {
  const {
    id, email, password, Gclass, first_name, last_name, grad_date, is_registred
  } = req.body;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters'));
  }

  // const Gclass = parseInt(req.body.Gclass, 10);
  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      return bcrypt.hash(req.body.password, 12)
    })
    .then((hashed_password) => {
        return knex('users')
          .where('id', id )
          .update({
            first_name, last_name, email, hashed_password, Gclass, grad_date, is_registred
          // first_name: req.body.first_name,
          // last_name: req.body.last_name,
          // email: req.body.email,
          // hashed_password: hashed_password,
          // Gclass: Gclass,
          // grad_date: req.body.grad_date,
          // is_registred: req.body.is_registred
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

      delete user.hashed_password
      delete user.reg_url
      delete user.is_registred

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
