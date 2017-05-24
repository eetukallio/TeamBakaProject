import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import './ShoppingCart.css';
import ShoppingCartTable from './components/ShoppingCartTable';
import { removeItem, clearItems } from '../../actions/shoppingcart_actions';


class ShoppingCart extends Component {
    removeItem(item) {
        console.log(item);
        this.props.removeItem(item);
    }

    clearItems() {
        this.props.clearItems();
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
                            <Link to="checkout"><button className="to-checkout btn btn-default">Proceed to checkout</button></Link>
                        </div>
                    </div>
                ) :
                    (
                        <h1 style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>Nothing here but us fishes ¯\_(ツ)_/¯</h1>
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