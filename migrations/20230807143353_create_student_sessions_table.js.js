exports.up = function (knex) {
  return knex.schema.createTable('student_sessions', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().references('id').inTable('users');
    table
      .integer('tutoring_session_id')
      .unsigned()
      .references('id')
      .inTable('tutoring_sessions');
    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.string('subject').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.enu('status', ['Pending', 'Confirmed', 'Cancelled']).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('student_sessions');
};
