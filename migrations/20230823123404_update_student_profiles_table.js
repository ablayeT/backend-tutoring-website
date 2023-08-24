
exports.up = function (knex) {
    return knex.schema.alterTable('student_profiles', (table) => {
      table.renameColumn('university', 'school_name');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('student_profiles', (table) => {
      table.renameColumn('school_name', 'university');
    });
  };
  
