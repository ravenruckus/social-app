'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('projects_comments', (table) => {
    table.increments();
    table.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .index();
    table.integer('projects_id')
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE')
          .index();
    table.text('project_comment').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects_comments');
};
