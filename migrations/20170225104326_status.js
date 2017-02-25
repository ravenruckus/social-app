'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('status', (table) => {
    table.increments();
    table.integer('user_id')
          .notNullable()
          .defaultTo(0)
          .references('id')
          .inTable('users')
          .index();
    table.text('status_update').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.text('link').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('status');
};
