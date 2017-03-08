'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../db');
const emailSend = require('emailjs/email');


// eslint-disable-next-line new-cap
const router = express.Router();

// <============== route to create invitation to users  ==================>

router.post('/newusers', (req, res, next) => {
  const {
    email, first_name, last_name, is_admin
  } = req.body;

  if (!is_admin) {
    return next(boom.create(400, 'Admin status must not be blank'));
  }
  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }
      const emailJSON = JSON.stringify(email);
      return Buffer.from(emailJSON, 'utf8').toString('base64');
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
      for (const user of users) {
        //creating request for sending invitation
        const emailServer = emailSend.server.connect({
           user: `${process.env.E_S_L}`,
           password: `${process.env.E_S_P}`,
           host:	"smtp-mail.outlook.com",
           tls: {ciphers: "SSLv3"}
        });

        const message	= {
           text:	`You are invited to new social network for Galvanize students Here is link for continue registration: https://students-network.herokuapp.com/newuser/${user.reg_url}`,
           from:	`Social-App Invitation <${process.env.E_S_L}>`,
           to:		`${user.first_name} ${user.last_name} <${user.email}>`,
           subject:	"Invitation to Galvanize students social network"
        };

        // send the message and get a callback with an error or details of the message that was sent
        emailServer.send(message, (err, message) => {
          if(err) {
            throw boom.create(400, `Invitation email was not sent ${err}`);
          }
         return res.send(message);
       })
      }
    })
    .catch((err) => {
      next(err);
    });
});

// <============== route to get all users from admin panel ==================>

router.get('/users', (req, res, next) => {
  knex('users')
    .orderBy('email')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error('Here is error from route admin' + err);
      next(err);
    });
});

// <============== route request for registration ==================>

router.post('/reqnew', (req, res, next) => {
  const {
    email, first_name, last_name, g_class, grad_date
  } = req.body;

  if (!first_name || !first_name.trim()) {
    return next(boom.create(400, 'First Name must not be blank'));
  }
  if (!last_name || last_name.trim()) {
    return next(boom.create(400, 'Last Name must not be blank'));
  }
  if (!g_class || !g_class.trim()) {
    return next(boom.create(400, 'Gclass must not be blank'));
  }
  if (!grad_date || grad_date.trim()) {
    return next(boom.create(400, 'Graduation date must not be blank'));
  }
  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

        //creating request for sending invitation
        const emailServer = emailSend.server.connect({
           user: `${process.env.E_S_L}`,
           password: `${process.env.E_S_P}`,
           host:	"smtp-mail.outlook.com",
           tls: {ciphers: "SSLv3"}
        });

        const message	= {
           text:	`email: ${email}, first_name: ${first_name}, last_name: ${last_name}, Gclass: ${g_class}, grad_date: ${grad_date}`,
           from:	`Social-App Invitation <${process.env.E_S_L}>`,
           to:		`usa.paul@icloud.com`,
           subject:	"Request for registration on SSN"
        };

        // send the message and get a callback with an error or details of the message that was sent
        emailServer.send(message, (err, message) => {
          if(err) {
            throw boom.create(400, `Invitation email was not sent ${err}`);
          }
         return res.send(message);
       })

});


module.exports = router;
