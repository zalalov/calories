import {
    ENTITY_CREATE,
    ENTITY_UPDATE,
    ENTITY_FETCH,
    SELECT_ENTITY_ITEM,
    ENTITY_DELETE,
    CLEAR_ENTITY_LIST
} from '../constants/actionType';


let initialState = {
    users: {
        data: [],
        error: null
    },
    meals: {
        data: [],
        error: null
    },
    selectedItem: {
        user: {},
        meal: {},
    }
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
    state = state || initialState;
    let newState;

    console.log('Crud Reducer.');
    console.log(action.type);

    console.log(action);

    switch (action.type) {
        case ENTITY_CREATE:
            return Object.assign({}, state, {
                [action.entity]: action.data
            });

        case ENTITY_UPDATE:
            return Object.assign({}, state, {
                [action.entity]: action.data
            });

        case ENTITY_FETCH:
            return Object.assign({}, state, {
                [action.entity]: action.data
            });

        case ENTITY_DELETE:
            const data = Object.assign({}, state);

            return Object.assign({}, state, {
                [action.entity]: data.filter(data => data.id !== action.data.id)
            });

        case SELECT_ENTITY_ITEM:
            newState.selectedItem[action.entity] = Object.assign({}, state, action.data);
            return newState;

        case CLEAR_ENTITY_LIST:
            newState[action.entity] = {};
            return newState;

        default:
            return state;
    }
}