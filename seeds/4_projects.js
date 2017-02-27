'use strict';

exports.seed = function(knex) {
  return knex('projects').del()
    .then(() => {
      return knex('projects').insert([{
        id: 1,
        user_id: 1,
        title: 'An App for Dog Lovers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img_url: 'https://static.pexels.com/photos/1173/animal-dog-pet-cute.jpg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 3,
        created_at: new Date('2017-02-24 14:43:04 UTC'),
        updated_at: new Date('2017-02-24 14:43:04 UTC')
      },
      {
        id: 2,
        user_id: 1,
        title: 'An App for Cat Lovers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img_url: 'https://static.pexels.com/photos/96938/pexels-photo-96938.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 1,
        created_at: new Date('2017-02-24 14:43:04 UTC'),
        updated_at: new Date('2017-02-24 14:43:04 UTC')
      }
    ])
    })
    .then(function() {
      return knex.raw("SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));");
    });
};
