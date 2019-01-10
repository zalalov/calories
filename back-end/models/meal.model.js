import bookshelf from '../config/bookshelf';

/**
 * Meal model.
 */
class Meal extends bookshelf.Model {
    get tableName() {
        return 'meals';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Meal;