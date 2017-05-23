import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './views/login/Login'
import Config from './views/info/Config';
import ShoppingCart from './views/shoppingCart/ShoppingCart';
import Checkout from './views/checkout/Checkout'
import Browse from './views/browse/Browse';
import ProductShowcase from './views/browse/browseComponents/ProductShowcase';
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
import Orders from './views/orders/Orders';

/**
 * Redux store initialization.
 *
 * @type {StoreEnhancerStoreCreator<S>} Middleware to be used by redux.
 */
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

/**
 * Redux store.
 */
const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * JSON Web Token and user role from the cookie.
 */
const token = cookie.load('token');
const isAdmin = cookie.load(('user')).role;


/**
 * Setting the authentication state if an existing token was found.
 */
if (token) {
    store.dispatch({type: SET_AUTH, isAdmin: isAdmin === "admin"});
    axios.defaults.headers.common['Authorization'] = token;
}

/**
 * Default baseURL to be used by axios.
 *
 * @type {string} URL of the REST API.
 */
axios.defaults.baseURL = 'http://localhost:8080';

/**
 * Entry point of the react application.
 * Sets the routes to be used in a react-router 3.x.x manner.
 */
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Browse}/>
                {/*<Route path="/login" component={Login}/>*/}
                <Route path="/cart" component={ShoppingCart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/config" component={Config}/>
                <Route path="/browse">
                    <IndexRoute component={Browse} />
                    <Route path="/item" component={ProductShowcase} />
                </Route>
                <Route path="/login" name="login" component={Login}/>
                <Route path="/orders" name="orders" component={Orders}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
