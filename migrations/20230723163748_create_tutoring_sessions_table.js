/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tutoring_sessions', (table) => {
    table.increments('id').primary();
    table.integer('tutor_id').unsigned().references('id').inTable('users');
    table.integer('subject_id').unsigned().references('id').inTable('subjects');
    table.date('date');
    table.time('start_time');
    table.time('end_time');
    table.string('location', 255);
    table.decimal('price', 10, 2);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tutoring_sessions');
};


  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
