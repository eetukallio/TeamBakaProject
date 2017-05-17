import React, { Component } from 'react';
import Router from 'react-router'
import './Nav.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import cartImg from '../images/shoppingCart.png';

class Nav extends Component {

    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }


    handleSearch(e) {
        const transitionTo = Router.transitionTo('/browse', {search: e.target.value});

        if (e.key === 'Enter') {
            this.props.history.push('/browse')
        }
    }

    render() {
        return (
            <div className="Nav">
                <header className="header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="headerContent">
                    <h1 className="headline"> BODY PILLOW E-STORE</h1>
                    <ul className="header-subnav">
                        <li><Link to="/browse" activeClassName="active">BROWSE PRODUCTS</Link></li>
                        <li><Link to="/info" activeClassName="active"> PLACEHOLDER </Link></li>
                        <li>
                            <div className="searchBar">
                                <span className="glyphicon glyphicon-search" />
                                <input id="input" onKeyDown={this.handleSearch} />
                            </div>
                        </li>
                        <div className="logInOut" >
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

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, { logout })(Nav);