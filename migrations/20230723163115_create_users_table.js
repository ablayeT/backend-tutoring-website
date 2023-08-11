/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('full_name', 255);
    table.string('email', 255).unique();
    table.string('password', 255);
    table.enu('user_type', ['Student', 'Tutor']);
    table.boolean('activated').defaultTo(false);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('last_login').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


