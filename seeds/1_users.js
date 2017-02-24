
'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
  id: 1,
  email: 'email@email.com',
  hashed_password: 'password',
  first_name: 'Fred',
  last_name: 'Markus',
  Gclass: '1',
  grad_date:'2016-06-06 14:26:16 UTC',
  is_admin: true,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
    }])
  })
    .then(function(){
     return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
   });
};
