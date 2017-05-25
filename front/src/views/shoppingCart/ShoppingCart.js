import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import './ShoppingCart.css';
import ShoppingCartTable from './components/ShoppingCartTable';
import LoginForm from '../login/form/LoginForm';
import RegisterForm from '../login/form/RegisterForm';
import { Alert, Modal } from 'react-bootstrap';
import {login, register, changeForm, changeRegistrationForm} from '../../actions/auth';
import { removeItem, clearItems } from '../../actions/shoppingcart_actions';


class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            showRegister: false
        }

        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
    }

    removeItem(item) {
        console.log(item);
        this.props.removeItem(item);
    }

    clearItems() {
        this.props.clearItems();
    }

    toggleLogin() {
        this.setState({showLogin: !this.state.showLogin})
    }

    toggleRegister() {
        this.setState({showRegister: !this.state.showRegister})
    }

    login(data) {
        this.props.login(data);
    }

    register(formData) {
        this.props.register(formData);
    }


    calculateSubtotal() {
        let subtotal = 0;
        const data = this.props.data.items;
        data.map(function (obj) {
            subtotal += obj.price;
        });
        return <span>Subtotal: {subtotal}€</span>;
    }

    render() {
        const user = cookie.load('user');

        const { formState, currentlySending } = this.props.authData;
        const { registerFormState, registerCurrentlySending} = this.props.registerData;

        return (
            <div className="shoppingCart">
                <h3 className="title">SHOPPING CART</h3>
                {this.props.data.items.length !== 0 ? (
                    <div className="shoppingcart-content">
                        <div className="shoppingcart-items">
                            <ShoppingCartTable  onRemove={this.removeItem.bind(this)}
                                                onClear={this.props.clearItems.bind(this)}
                                                data={this.props.data} />
                        </div>
                        <div className="shoppingcart-info">
                            <p>{this.props.data.items.length} {this.props.data.items.length > 1 ? "items" : "item"}</p>
                            {this.calculateSubtotal()}
                            {user ? null :
                                <div className="sign-in-you-fool">
                                    <p >Keep track of your orders by <a onClick={this.toggleLogin}>signing in.</a></p>
                                    <p onClick={this.toggleRegister}>Not yet a user? <a onClick={this.toggleLogin}>Register here.</a></p>
                                </div>}
                            <Link to="checkout"><button className="to-checkout btn btn-default">Proceed to checkout</button></Link>
                        </div>
                    </div>
                ) :
                    (
                        <h1 style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>Nothing here but us fishes ¯\\_(ツ)_/¯</h1>
                    )}

                <Modal show={this.state.showLogin} onHide={this.toggleLogin}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="addWorker">
                            <LoginForm
                                data={formState}                            onChange={this.props.changeForm}
                                location={location}                         history={this.props.history}
                                onSubmit={this.login.bind(this)}         btnText={"Log In"}
                                currentlySending={currentlySending}         errorMessage={this.props.authData.errorMessage} />
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showRegister} onHide={this.toggleRegister}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="addWorker">
                            <RegisterForm
                                data={registerFormState}                    onChange={this.props.changeRegistrationForm}
                                location={location}                         history={this.props.history}
                                onSubmit={this.register.bind(this)}         btnText={"Submit"}
                                currentlySending={registerCurrentlySending} errorMessage={this.props.registerData.errorMessage} />
                        </div>
                    </Modal.Body>
                </Modal>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.shoppingCart,
        authData: state.auth,
        registerData: state.register
    }
}

export default connect(mapStateToProps, {login, register, changeForm, changeRegistrationForm, removeItem, clearItems})(ShoppingCart);