import { combineReducers } from 'redux';
import loginReducer from './loginform_reducer';
import registerReducer from './register_reducer';
import shoppingCartReducer from './shoppingcart_reducer'

const rootReducer = combineReducers({
    auth: loginReducer,
    register: registerReducer,
    shoppingCart: shoppingCartReducer
});

export default rootReducer;