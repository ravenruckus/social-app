'use strict';

exports.seed = function(knex) {
  return knex('status').del()
    .then(() => {
      return knex('status').insert([{
        id: 1,
        user_id: 1,
        status_update: 'Cats secretly make all the worlds muffins rub face on everything, kitty power! so cat slap dog in face.',
        likes: 3,
        link: 'https://soundcloud.com'
      },
      {
        id: 2,
        user_id: 1,
        status_update: 'Meow stare out the window yet inspect anything.',
        likes: 2,
        link: ''

      },
      {
        id: 3,
        user_id: 1,
        status_update: "Step on your keyboard while you're gaming",
        likes: 0,
        link: ''
      },
      {
        id: 4,
        user_id: 1,
        status_update: '',
        likes: 3,
        link: 'https://independent.co.uk/'
      },
      {
        id: 5,
        user_id: 1,
        status_update: 'fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer',
        likes: 7,
        link: ''
      }
    ])
    })
    .then(function() {
      return knex.raw("SELECT setval('status_id_seq', (SELECT MAX(id) FROM status));");
    });
};
