import history from '../utils/history';

/**
 * Import all commonAction as an object.
 */
import * as commonAction from './commonAction';

/**
 * Import all httpService as an object.
 */
import * as mealService from '../services/mealService';
import * as httpService from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * entity = 'Product', 'Employee', ...
 */


export function fetchByUserId(userId, params) {
    return function (dispatch) {
        return mealService.fetchByUserId(userId, params).then((response) => {
            dispatch(commonAction.fetch('meals', response.data));
        })
            .catch((error) => {
                dispatch(commonAction.failure(error));
            });
    };
}

export function storeItem(data, userId) {
    return function (dispatch) {
        return mealService.storeItem(userId, data).then((response) => {
            history.goBack();
        })
            .catch((error) => {
                dispatch(commonAction.failure(error));
            });
    };
}

export function updateItem(data, userId, id) {
    return function (dispatch) {
        return mealService.updateItem(userId, id, data).then((response) => {
            history.goBack();
        })
            .catch((error) => {
                dispatch(commonAction.failure(error));
            });
    };
}

export function destroyItem(userId, id) {
    return function (dispatch) {
        return mealService.destroyItem(userId, id).then((response) => {
            dispatch(fetchByUserId(userId));
        })
            .catch((error) => {
                dispatch(commonAction.failure(error));
            });
    };
}

export function submitForm(data, userId, id) {
    return function (dispatch) {
        if (id) {
            dispatch(updateItem(data, userId, id));
        } else {
            dispatch(storeItem(data, userId));
        }
    }
}