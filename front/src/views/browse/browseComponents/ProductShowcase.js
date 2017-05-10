/**
 * Created by Eetu Kallio on 11.5.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addItem} from '../../../actions/shoppingcart_actions';

class ProductShowcase extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.setProduct = this.setProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(obj) {
        console.log('add to cart:');
        console.log(obj);
        this.props.addItem(obj);
    }

    setProduct() {


    }

    render() {
        return (
            <div>
                <span>single product here</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stuff: state.shoppingCart
    }
}

export default connect(mapStateToProps, {addItem})(ProductShowcase);