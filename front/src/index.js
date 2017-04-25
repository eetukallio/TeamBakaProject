import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './views/login/Login'
import Info from './views/info/Info';
import ShoppingCart from './views/shoppingCart/ShoppingCart';
import Checkout from './views/checkout/Checkout'
import Browse from './views/browse/Browse';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import { checkAuth } from './utils/checkAuth';
import cookie from 'react-cookie';
import {SET_AUTH} from './constants/AppConstants';
import axios from 'axios';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = cookie.load('token');

if (token) {
    store.dispatch({type: SET_AUTH})
}

axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Browse}/>
                {/*<Route path="/login" component={Login}/>*/}
                <Route path="/cart" component={ShoppingCart}>
                    <Route path="/cart/checkout" component={Checkout} />
                </Route>
                <Route path="/info" component={Info}/>
                <Route path="/browse" component={Browse}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
