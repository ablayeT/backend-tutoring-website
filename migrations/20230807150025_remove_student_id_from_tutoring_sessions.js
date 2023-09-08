exports.up = function (knex) {
  return knex.schema.alterTable('tutoring_sessions', (table) => {
    table.dropColumn('status');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('tutoring_sessions', (table) => {
    table.enu('status', ['Pending', 'Confirmed', 'Cancelled']);
  });
};
