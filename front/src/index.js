import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './views/login/Login'
import Paychecks from './views/info/Info';
import HourEntry from './views/shoppingCart/ShoppingCart';
import Management from './views/browse/Browse';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { homeReducer } from './reducers/index';
import { checkAuth } from './utils/checkAuth';
import cookie from 'react-cookie';
import {SET_AUTH} from './constants/AppConstants';
import Customers from './views/browse/browseComponents/Customers';
import Workers from './views/browse/browseComponents/Products';
import HourEntries from './views/browse/browseComponents/HourEntries';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

const token = cookie.load('token');

if (token) {
    store.dispatch({type: SET_AUTH})
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={checkAuth(HourEntry)}/>
                <Route path="/info" component={checkAuth(Paychecks)}/>
                <Route path="/browse" component={checkAuth(Management)}>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
