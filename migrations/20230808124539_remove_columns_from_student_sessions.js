exports.up = function (knex) {
  return knex.schema.table('student_sessions', (table) => {
    table.dropColumn('price');
  });
};

exports.down = function (knex) {
  return knex.schema.table('student_sessions', (table) => {
    table.decimal('price', 10, 2);
  });
};
