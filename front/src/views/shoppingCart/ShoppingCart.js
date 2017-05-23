import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import './ShoppingCart.css';
import ShoppingCartTable from './components/ShoppingCartTable';
import { removeItem, clearItems } from '../../actions/shoppingcart_actions';


class ShoppingCart extends Component {
    removeItem(item) {
        this.props.removeItem(item);
    }

    clearItems() {
        this.props.clearItems();
    }

    render() {
        return (
            <div className="shoppingCart">
                {this.props.data.items.length !== 0 ? (
                    <div className="shoppingcart-content">
                        <ShoppingCartTable  onRemove={this.removeItem.bind(this)}
                                            onClear={this.props.clearItems.bind(this)}
                                            data={this.props.data} />
                        <Link to="checkout"><button>Proceed to checkout</button></Link>
                    </div>
                ) :
                    (
                        <h1>Your shopping cart is empty</h1>
                    )}


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.shoppingCart
    }
}

export default connect(mapStateToProps, {removeItem, clearItems})(ShoppingCart);