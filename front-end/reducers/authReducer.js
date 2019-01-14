// Import custom components
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
    GET_USER_INFO_SUCCESS
} from '../constants/actionType';

var initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
    state = state || initialState;

    switch (action.type) {
        case LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isLoading: false,
                token: action.data.token,
                role: action.data.role,
                id: action.data.id
            });

        case LOG_IN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: false,
                token: null,
                errorMessage: action.error.message || 'Something went wrong.'
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: true,
                token: null,
                errorMessage: null
            });

        case GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                role: action.data.role,
                id: action.data.id
            });

        default:
            return state;
    }
}