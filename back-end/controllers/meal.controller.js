import HttpStatus from 'http-status-codes';
import Meal from '../models/meal.model';

/**
 * Find all the meals
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
    Meal.forge()
        .fetchAll()
        .then(meal => res.json({
                error: false,
                data: meal.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Find meal by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    Meal.forge({id: req.params.id})
        .fetch()
        .then(meal => {
            if (!meal) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: meal.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Store new meal
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
    const {user_id, text, calories} = req.body;

    Meal.forge({
        user_id, text, calories
    }, {hasTimestamps: true}).save()
        .then(meal => res.json({
                success: true,
                data: meal.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Update meal by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    Meal.forge({id: req.params.id})
        .fetch({require: true})
        .then(meal => meal.save({
                user_id: req.body.user_id || meal.get('user_id'),
                text: req.body.text || meal.get('text'),
                calories: req.body.calories || meal.get('calories')
            })
                .then(() => res.json({
                        error: false,
                        data: meal.toJSON()
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Destroy meal by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
    Meal.forge({id: req.params.id})
        .fetch({require: true})
        .then(meal => meal.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Meal deleted successfully.'}
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: err.message}
                })
            )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}