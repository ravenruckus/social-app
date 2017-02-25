'use strict';

exports.seed = function(knex) {
  return knex('status').del()
    .then(() => {
      return knex('status').insert([{
        id: 1,
        user_id: 1,
        status_update: 'metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et',
        likes: 3,
        link: 'https://soundcloud.com',
        created_at: new Date('2017-02-24 14:43:04 UTC'),
        updated_at: new Date('2017-02-24 14:43:04 UTC')
      },
      {
        id: 2,
        user_id: 1,
        status_update: 'quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis',
        likes: 2,
        link: '',
        created_at: new Date('2017-02-24 14:43:04 UTC'),
        updated_at: new Date('2017-02-24 14:43:04 UTC')
      },
      {
        id: 3,
        user_id: 1,
        status_update: 'leo rhoncus sed vestibulum sit amet cursus id turpis integers',
        likes: 0,
        link: '',
        created_at: new Date('2017-02-24 15:43:04 UTC'),
        updated_at: new Date('2017-02-24 15:43:04 UTC')
      },
      {
        id: 4,
        user_id: 1,
        status_update: '',
        likes: 3,
        link: 'https://independent.co.uk/',
        created_at: new Date('2017-02-24 16:43:04 UTC'),
        updated_at: new Date('2017-02-24 16:43:04 UTC')
      },
      {
        id: 5,
        user_id: 1,
        status_update: 'fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer',
        likes: 7,
        link: '',
        created_at: new Date('2017-02-24 14:43:04 UTC'),
        updated_at: new Date('2017-02-24 14:43:04 UTC')
      }
    ])
    })
}
