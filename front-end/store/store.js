import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import history from '../utils/history';
// Import custom components
import rootReducer from '../reducers/rootReducer';

const middleware = routerMiddleware(history);


/**
 * Create redux store that holds the app state.
 */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware, middleware, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;