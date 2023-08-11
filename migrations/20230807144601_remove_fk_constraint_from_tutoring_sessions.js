/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    // Supprimer la contrainte de clé étrangère
    return knex.schema.raw('ALTER TABLE tutoring_sessions DROP FOREIGN KEY tutoring_sessions_student_id_foreign')
      .then(() => {
        // Supprimer la colonne student_id
        return knex.schema.table('tutoring_sessions', (table) => {
          table.dropColumn('student_id');
        });
      });
  };
  
  exports.down = function (knex) {
    // Remettre la colonne student_id
    return knex.schema.table('tutoring_sessions', (table) => {
      table.integer('student_id').unsigned().references('id').inTable('users');
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */




