import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Import custom components
import authReducer from './authReducer';
import crudReducer from './crudReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    entities: crudReducer,
    form: formReducer  // ← redux-form
});

export default rootReducer;