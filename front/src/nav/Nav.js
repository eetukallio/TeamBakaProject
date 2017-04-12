import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/actionCreators';
import cartImg from '../images/shoppingCart.png';
// import logo from '../images/urho-logo.png';

class Nav extends Component {

    render() {
        return (
            <div className="Nav">
                <header className="header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h1 className="headline"> BODY PILLOW E-STORE</h1>
                    <ul className="header-subnav">
                        <li><Link to="/browse">BROWSE PRODUCTS</Link></li>
                        <li><Link to="/info"> PLACEHOLDER </Link></li>
                        <li><Link to="/home"><img className="cartImg" src={cartImg} alt="Shopping cart" /> </Link> </li>

                        {this.props.loggedIn ? (
                                <li><a href="#" onClick={this.props.logout}>LOG OUT</a></li>
                            ) : (
                                <li><Link to="/login">LOG IN</Link></li>
                            )}
                    </ul>
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