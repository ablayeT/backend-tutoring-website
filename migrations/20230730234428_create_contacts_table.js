/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('contacts', function(table) {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('email', 255);
    table.text('message');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contacts');
};

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

