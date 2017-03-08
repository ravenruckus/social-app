'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.integer('user_id')
          .notNullable()
          .defaultTo(0)
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .index();
    table.text('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('img_url').notNullable().defaultTo('');
    table.string('web_url').notNullable().defaultTo('');
    table.string('github_link').notNullable().defaultTo('');
    table.string('github_readme').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
