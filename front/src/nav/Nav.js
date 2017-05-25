import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

/**
 * The navigation component.
 */
class Nav extends Component {

    /**
     * Constructor for setting the initial state and binding functions to this component's context.
     */
    constructor(props) {
        super(props);

        this.state = {
            username: cookie.load('user').username
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.openClick = this.openClick.bind(this);
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

    openClick() {
        const burgerMenu = document.getElementsByClassName("header-burger");
        const icon = document.getElementById("nav-icon3");
        const content = document.getElementsByClassName("site-content");
        if (icon.className !== "open") {
            icon.className = "open";
            burgerMenu[0].style.top = '65px';
            content[0].style.top = '165px';
        } else if (icon.className === "open") {
            burgerMenu[0].style.top = '-200px';
            content[0].style.top = '0px';
            icon.className = "";
        }

    }

    /**
     * React render(). Represents the navigation part of the application.
     *
     * @return {XML} Returns a <div> element holding the navigation of the application.
     */
    render() {
        return (
            <div className="Nav" id="Nav">
                <header className="header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="headerContent">
                    <h1 className="headline">BAKA STORE</h1>
                    <ul className="header-subnav">
                        <li className="browse"><Link to="/browse" activeClassName="active">BROWSE PRODUCTS</Link></li>
                        <li>
                            <div className="searchBar" >
                                <span className="glyphicon glyphicon-search" />
                                <input id="search-input" onKeyDown={this.handleSearch}/>
                            </div>
                        </li>
                        <div className="logInOut" >
                            {this.props.isAdmin ? (<li><Link to="/config" activeClassName="active"> <span className="glyphicon glyphicon-cog" /> </Link></li>
                            ) : null}
                            <li><Link to="/cart" activeClassName="active"><span className="glyphicon glyphicon-shopping-cart"/> </Link></li>


                        {this.props.loggedIn ? (

                                <li>
                                    <div className="user-dropdown" id="user-dropdown">
                                        <span className="glyphicon glyphicon-user user-menu" onClick={this.showMenu} />
                                        <span className="userName">{this.state.username}</span>
                                        <div className="dropdown-content" id="dropdown-content" style={{display: "none"}}>

                                            <Link to="orders" activeClassName="active">MY ORDERS</Link>
                                            <a className="logout-button" href="#" onClick={this.props.logout}>LOG OUT</a>

                                        </div>

                                    </div>
                                </li>
                            ) : (
                                <li><Link activeClassName="active" to="/login"><span className="login-button">LOG IN</span></Link></li>
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

                <ul className="header-burger" style={{top: '-200px'}}>
                    <li>
                        <div className="mobile-searchbar" >
                            <span className="glyphicon glyphicon-search" />
                            <input id="mobile-search-input" onKeyDown={this.handleSearch}/>
                        </div>
                    </li>

                    <li onClick={this.openClick}><Link to="/browse" activeClassName="active">Browse Products</Link></li>
                    <li onClick={this.openClick}><Link to="/cart" activeClassName="active">Shopping Cart</Link> </li>
                    <div className="logInOut" ></div>
                    {this.props.loggedIn ? (
                        <div className="burger-logged-in">
                            {this.props.isAdmin ?
                                <li onClick={this.openClick}><Link to="/config" activeClassName="active">Admin Panel</Link></li>
                                : null}
                            <li onClick={this.openClick}> <Link to="orders" activeClassName="active">My Orders</Link></li>
                            <li onClick={this.openClick}><a href="#" onClick={this.props.logout}>Log Out</a></li>
                        </div>
                    ) : (
                        <li onClick={this.openClick}><Link to="/login">Log In</Link></li>
                    )}
                </ul>

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