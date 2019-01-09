/**
 * Up meals table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating meals table');
    return knex.schema.createTable('meals', table => {
        table.increments('id').primary().unsigned();
        table.string('user_id').notNullable();
        table.string('text').notNullable();
        table.integer('calories').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop meals table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping meals table');
    return knex.schema.dropTable('meals');
};