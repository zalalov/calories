
exports.up = function(knex, Promise) {
    console.log('Adding eaten_at field to meals table');
    return knex.schema.table('meals', table => {
        table.dateTime('eaten_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('meals').dropColumn('eaten_at');
};
