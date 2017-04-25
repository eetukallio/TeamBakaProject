import { combineReducers } from 'redux';
import loginReducer from './loginform_reducer';
import registerReducer from './register_reducer';

const rootReducer = combineReducers({
    auth: loginReducer,
    register: registerReducer
});

export default rootReducer;