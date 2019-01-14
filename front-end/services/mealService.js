import {fetch, destroy} from "../utils/httpUtil";
import {API_URL} from "../config/config";
import {getPathParam} from "../utils/serializeUtil";
import * as commonAction from "../actions/commonAction";
import * as httpService from "./httpService";

export function fetchByUserId(userId) {
    return fetch(API_URL, getPathParam('users', userId, 'meals'));
}

export function destroyItem(userId, id) {
    return destroy(API_URL, getPathParam('users', userId, 'meals', id));
}