import React, { Component } from 'react';
import {Router} from 'react-router'
import './Nav.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { browserHistory } from 'react-router';
import cartImg from '../images/shoppingCart.png';
import Orders from '../views/orders/Orders';

/**
 * The navigation component.
 */
class Nav extends Component {

    /**
     * Constructor for setting the initial state and binding functions to this component's context.
     */
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * Handles the search input and redirection after a search is to be submitted.
     */
    handleSearch(e) {
        console.log('handle search');
        console.log('handle search');
        const event = e || window.event;
        const keyCode = event.keyCode || event.which;
        if (keyCode === 13) {
            console.log('ENTER HIT');
            browserHistory.push({
                pathname: '/browse',
                query: { search: e.target.value }
            });
        }
    }

    /**
     * React render(). Represents the navigation part of the application.
     *
     * @return {XML} Returns a <div> element holding the navigation of the application.
     */
    render() {
        return (
            <div className="Nav">
                <header className="header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="headerContent">
                    <h1 className="headline"> BODY PILLOW E-STORE</h1>
                    <ul className="header-subnav">
                        <li><Link to="/browse" activeClassName="active">BROWSE PRODUCTS</Link></li>

                        <li>
                            <div className="searchBar">
                                <span className="glyphicon glyphicon-search" />
                                <input id="input" onKeyDown={this.handleSearch} />
                            </div>
                        </li>
                        <div className="logInOut" >
                            <li><Link to="orders" activeClassName="active">MY ORDERS</Link></li>
                            <li><Link to="/config" activeClassName="active"> <span className="glyphicon glyphicon-cog" /> </Link></li>
                            <li><Link to="/cart" activeClassName="active"><span className="glyphicon glyphicon-shopping-cart"/> </Link> </li>

                        {this.props.loggedIn ? (
                                <li><a href="#" onClick={this.props.logout}>LOG OUT</a></li>
                            ) : (
                                <li><Link to="/login">LOG IN</Link></li>
                            )}
                        </div>

                    </ul>
                    </div>
                </header>
            </div>

        );
    }
}

/**
 * Redux mapping.
 *
 * @param state
 * @return {{loggedIn: (*|boolean)}}
 */
function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, { logout })(Nav);