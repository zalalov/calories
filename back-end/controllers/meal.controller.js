import HttpStatus from 'http-status-codes';
import Meal from '../models/meal.model';
import dateformat from 'dateformat';
import moment from 'moment';

/**
 * Find all user's meals
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByUser(req, res) {
    let {userId} = req;

    if (!userId) {
        userId = req.currentUser.get('id');
    }

    const {date_from, date_to, time_from, time_to} = req.query;

    const queryConditions = (userId, dateFrom, dateTo, timeFrom, timeTo) => {
        let conditions = [
            'user_id = ' + userId
        ];

        let df = new Date(dateFrom);
        let dt = new Date(dateTo);
        let tf = moment(timeFrom, 'HH:mm:ss');
        let tt = moment(timeTo, 'HH:mm:ss');

        if (dateFrom) {
            conditions.push(`eaten_at::date >= '${dateformat(df, 'yyyy-mm-dd')}'`);
        }

        if (dateTo) {
            conditions.push(`eaten_at::date <= '${dateformat(dt, 'yyyy-mm-dd')}'`)
        }

        if (timeFrom) {
            conditions.push(`eaten_at::time >= '${tf.format('HH:mm:ss')}'`)
        }

        if (timeTo) {
            conditions.push(`eaten_at::time <= '${tt.format('HH:mm:ss')}'`);
        }

        return conditions.join(' AND ');
    };

    Meal.where(qb => qb.whereRaw(queryConditions(userId, date_from, date_to, time_from, time_to)))
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
    const user_id = req.userId;
    const {text, calories} = req.body;

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