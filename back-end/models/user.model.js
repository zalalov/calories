import bookshelf from '../config/bookshelf';

const ROLE_REGULAR = 100;
const ROLE_MANAGER = 200;
const ROLE_ADMIN = 300;

/**
 * User model.
 */
class User extends bookshelf.Model {
    get tableName() {
        return 'users';
    }

    get hasTimestamps() {
        return true;
    }

    verifyPassword(password) {
        return this.get('password') === password;
    }

    isRegular() {
        return this.get('role') === ROLE_REGULAR
    }

    isManager() {
        return this.get('role') === ROLE_MANAGER;
    }

    isAdmin() {
        return this.get('role') === ROLE_ADMIN;
    }
}

exports.ROLE_REGULAR = ROLE_REGULAR;
exports.ROLE_MANAGER = ROLE_MANAGER;
exports.ROLE_ADMIN = ROLE_ADMIN;

exports.User = User;