
exports.up = function(knex, Promise) {
    console.log('Setting calories_goal default to 1000');
    return knex.raw(
        'update users set calories_goal = 1000 where calories_goal is null; ' +
        'alter table users alter column calories_goal set not null;' +
        'alter table users alter column calories_goal set default 1000;'
    );
};

exports.down = function(knex, Promise) {};
