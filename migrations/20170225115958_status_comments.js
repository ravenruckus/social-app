
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('status_comments', (table) => {
    table.increments();
    table.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .index();
    table.integer('status_id')
          .notNullable()
          .references('id')
          .inTable('status')
          .onDelete('CASCADE')
          .index();
    table.text('status_comment').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('status_comments');
};
