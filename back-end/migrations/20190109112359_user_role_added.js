import {ROLE_REGULAR} from '../models/user.model';

exports.up = function(knex, Promise) {
    console.log('adding user role to users table');
    return knex.schema.table('users', table => {
        table.integer('role').notNull().default(ROLE_REGULAR);
    });
};

exports.down = function(knex, Promise) {
    console.log('dropping user role from users table');
    return knex.schema.table('users', table => table.dropColumn('role'));
};
