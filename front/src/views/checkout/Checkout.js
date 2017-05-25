import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeCheckoutForm, sendPurchase} from '../../actions/shoppingcart_actions';
import './Checkout.css';
import CheckoutList from './components/CheckoutList';
import CheckoutForm from './components/CheckoutForm';
import cookie from 'react-cookie';


class Checkout extends Component {
    sendPurchase(data) {
        let sendData = {};
        const formData = data;
        const items = this.props.shoppingData.items;
        const userInfo = cookie.load('user');

        if (userInfo) {
            sendData = Object.assign({user: userInfo.id}, items, formData);
            console.log(sendData);
        } else {
            sendData = Object.assign({user: 4}, items, formData);
        }
        console.log(sendData);

        // this.props.sendPurchase(sendData);
    }

    removeItem(item) {
        this.props.removeItem(item);
    }

    clearItems() {
        this.props.clearItems();
    }

    render() {
        const { formState, currentlySending } = this.props.checkoutFormData;
        return (
            <div  className="checkout">
                <div className="listContainer">
                    <h3>You are purchasing:</h3>
                    <CheckoutList data={this.props.shoppingData} />
                </div>
                <div className="formContainer">
                    <h3>Shipping information</h3>
                    <CheckoutForm onSubmit={this.sendPurchase.bind(this)} onChange={this.props.changeCheckoutForm.bind(this)} data={formState} currentlySending={currentlySending} btnText={"Place order"} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shoppingData: state.shoppingCart,
        checkoutFormData: state.checkoutForm
    }
}

export default connect(mapStateToProps, {changeCheckoutForm, sendPurchase})(Checkout);