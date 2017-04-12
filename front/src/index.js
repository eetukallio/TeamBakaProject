import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './views/login/Login'
import Info from './views/info/Info';
import ShoppingCart from './views/shoppingCart/ShoppingCart';
import Browse from './views/browse/Browse';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { homeReducer } from './reducers/index';
import { checkAuth } from './utils/checkAuth';
import cookie from 'react-cookie';
import {SET_AUTH} from './constants/AppConstants';

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
                <IndexRoute component={Browse}/>
                {/*<Route path="/login" component={Login}/>*/}
                <Route path="/cart" component={ShoppingCart}/>
                <Route path="/info" component={Info}/>
                <Route path="/browse" component={Browse}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
