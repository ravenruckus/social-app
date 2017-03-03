
'use strict';

exports.seed = function(knex) {
  return knex('status_comments').del()
    .then(() => {
      return knex('status_comments').insert([{
    id: 1,
    status_id: 1,
    user_id: 1,
    status_comment: 'Lorem Ipsum has been the industry',
    likes: 3,
    created_at: new Date('2017-02-24 17:43:04 UTC'),
    updated_at: new Date('2017-02-24 17:43:04 UTC')
    },
    {
    id: 2,
    status_id: 2,
    user_id: 1,
    status_comment: 'readable content of a page when',
    likes: 3,
    created_at: new Date('2017-02-24 14:55:04 UTC'),
    updated_at: new Date('2017-02-24 14:55:04 UTC')
    },
    {
    id: 3,
    status_id: 2,
    user_id: 1,
    status_comment: 'Stretch have my breakfast spaghetti yarn.',
    likes: 3,
    created_at: new Date('2017-02-24 14:58:04 UTC'),
    updated_at: new Date('2017-02-24 14:58:04 UTC')
    },
    {
    id: 4,
    status_id: 4,
    user_id: 1,
    status_comment: 'Fall over dead (not really but gets sypathy) meow to be let in. ',
    likes: 0,
    created_at: new Date('2017-02-24 17:43:04 UTC'),
    updated_at: new Date('2017-02-24 17:43:04 UTC')
    }
])
  })
    .then(function(){
     return knex.raw("SELECT setval('status_comments_id_seq', (SELECT MAX(id) FROM status_comments));");
   });
};
