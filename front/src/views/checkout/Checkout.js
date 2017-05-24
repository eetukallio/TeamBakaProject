import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Checkout.css';
import CheckoutList from './components/CheckoutList';
import CheckoutForm from './components/CheckoutForm';


class Checkout extends Component {
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
                    <CheckoutForm data={formState} currentlySending={currentlySending} btnText={"Place order"} />
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

export default connect(mapStateToProps)(Checkout);