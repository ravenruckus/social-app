'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.integer('Gclass').notNullable().defaultTo(0);
    table.string('grad_date').notNullable().defaultTo('');
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.string('reg_url').notNullable().defaultTo('');
    table.boolean('is_registred').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
