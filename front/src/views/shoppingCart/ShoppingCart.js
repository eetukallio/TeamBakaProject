import React, { Component } from 'react';
import './ShoppingCart.css';
import HourForm from './form/OrderForm';

class HourEntry extends Component {

    render() {
        return (
            <div  className="hourEntry">
                <HourForm />
            </div>
        );
    }

}

export default HourEntry;