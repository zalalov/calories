
exports.up = function(knex, Promise) {
    console.log('Adding calories_goal field to users table');
    return knex.schema.table('users', table => {
        table.integer('calories_goal');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', table => table.dropColumn('calories_goal'));
};
