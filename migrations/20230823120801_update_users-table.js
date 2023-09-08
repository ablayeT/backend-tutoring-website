exports.up = function (knex) {
  return knex.schema
    .table('users', (table) => {
      // Ajouter les nouvelles colonnes
      table.string('first_name', 255);
      table.string('last_name', 255);
    })
    .then(() => {
      // Mettre à jour les nouvelles colonnes avec les données existantes
      return knex('users').update({
        first_name: knex.raw(
          "CASE WHEN INSTR(full_name, ' ') > 0 THEN SUBSTRING_INDEX(full_name, ' ', 1) ELSE full_name END",
        ),
        last_name: knex.raw(
          "CASE WHEN INSTR(full_name, ' ') > 0 THEN SUBSTRING_INDEX(full_name, ' ', -1) ELSE '' END",
        ),
      });
    })
    .then(() => {
      // Supprimer la colonne full_name
      return knex.schema.table('users', (table) => {
        table.dropColumn('full_name');
      });
    })
    .catch((errorr) => console.error(errorr));
};

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    // Revert: Ajouter la colonne full_name
    table.string('full_name', 255);

    // Mettre à jour la colonne full_name avec les données existantes
    table.update({
      full_name: knex.raw("CONCAT_WS(' ', first_name, last_name)"),
    });

    // Supprimer les nouvelles colonnes
    table.dropColumn('first_name');
    table.dropColumn('last_name');
  });
};
