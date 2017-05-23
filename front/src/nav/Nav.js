import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { browserHistory } from 'react-router';

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
        this.showMenu = this.showMenu.bind(this);
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

    showMenu() {
        let menu = document.getElementById("dropdown-content");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
        console.log(menu);
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
                        <li className="browse"><Link to="/browse" activeClassName="active">BROWSE PRODUCTS</Link></li>

                        <li>
                            <div className="searchBar">
                                <span className="glyphicon glyphicon-search" />
                                <input id="input" onKeyDown={this.handleSearch} />
                            </div>
                        </li>
                        <div className="logInOut" >
                            {this.props.isAdmin ? (<li><Link to="/config" activeClassName="active"> <span className="glyphicon glyphicon-cog" /> </Link></li>
                            ) : null}
                            <li><Link to="/cart" activeClassName="active"><span className="glyphicon glyphicon-shopping-cart"/> </Link> </li>


                        {this.props.loggedIn ? (
                            <div className="user-dropdown" id="user-dropdown">
                                <li><a className="glyphicon glyphicon-user user-menu" onClick={this.showMenu} /></li>

                                <div className="dropdown-content" id="dropdown-content">
                                    <ul>
                                        <li><Link to="orders" activeClassName="active">MY ORDERS</Link></li>
                                        <li><a href="#" onClick={this.props.logout}>LOG OUT</a></li>
                                    </ul>

                                </div>

                            </div>

                            ) : (
                                <li><Link to="/login">LOG IN</Link></li>
                            )}
                        </div>



                    </ul>

                        <div id="nav-icon3" onClick={this.openClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

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
        isAdmin: state.auth.isAdmin,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, { logout })(Nav);