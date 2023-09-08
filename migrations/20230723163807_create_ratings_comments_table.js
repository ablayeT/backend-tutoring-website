exports.up = function (knex) {
  return knex.schema.createTable('ratings_comments', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().references('id').inTable('users');
    table.integer('tutor_id').unsigned().references('id').inTable('users');
    table.integer('rating');
    table.text('comment');
    table.datetime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
