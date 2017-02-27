'use strict';

exports.seed = function(knex) {
  return knex('projects_comments').del()
    .then(() => {
      return knex('projects_comments').insert([{
    id: 1,
    projects_id: 1,
    user_id: 1,
    project_comment: 'Lorem Ipsum has been the industry',
    likes: 3,
    created_at: new Date('2017-02-24 17:43:04 UTC'),
    updated_at: new Date('2017-02-24 17:43:04 UTC')
    },
    {
    id: 2,
    projects_id: 2,
    user_id: 1,
    project_comment: 'readable content of a page when',
    likes: 1,
    created_at: new Date('2017-02-24 14:55:04 UTC'),
    updated_at: new Date('2017-02-24 14:55:04 UTC')
    },
    {
    id: 3,
    projects_id: 2,
    user_id: 1,
    project_comment: 'web sites still in their infancy',
    likes: 0,
    created_at: new Date('2017-02-24 14:58:04 UTC'),
    updated_at: new Date('2017-02-24 14:58:04 UTC')
    }
])
  })
    .then(function(){
     return knex.raw("SELECT setval('projects_comments_id_seq', (SELECT MAX(id) FROM projects_comments));");
   });
};
