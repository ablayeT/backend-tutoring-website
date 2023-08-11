/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('availability', (table) => {
    table.increments('id').primary();
    table.integer('tutor_id').unsigned().references('id').inTable('users');
    table.date('date');
    table.time('start_time');
    table.time('end_time');
    table.string('location', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('availability');
};

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
