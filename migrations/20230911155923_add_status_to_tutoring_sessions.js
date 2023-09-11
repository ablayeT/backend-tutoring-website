exports.up = function (knex) {
  return knex.schema.table('tutoring_sessions', (table) => {
    table.string('status', 255).defaultTo('Pending');
  });
};

exports.down = function (knex) {
  return knex.schema.table('tutoring_sessions', (table) => {
    table.dropColumn('status');
  });
};
