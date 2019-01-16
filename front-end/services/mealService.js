import {fetch, destroy, update, store} from "../utils/httpUtil";
import {API_URL} from "../config/config";
import {getPathParam} from "../utils/serializeUtil";
import {MEALS, USERS} from "../constants/entity";

export function fetchByUserId(userId, params) {
    return fetch(API_URL, getPathParam(USERS, userId, MEALS), params);
}

export function destroyItem(userId, id) {
    return destroy(API_URL, getPathParam(USERS, userId, MEALS, id));
}

export function updateItem(userId, id, data) {
    return update(API_URL, getPathParam(USERS, userId, MEALS, id), data);
}

export function storeItem(userId, data) {
    return store(API_URL, getPathParam(USERS, userId, MEALS), data);
}