import React, { Component } from 'react';
import './ShoppingCartItem.css';

export default class ShoppingCartItem extends Component {
    remove() {
        this.props.onRemove(this.props.id);
    }

    render () {
        return (
            <div className="shopping-cart-item">
                <div className="item-picture-container">
                    <img className="item-picture" src={this.props.imgUrl} alt="Product"/>
                </div>
                <div className="item-info">
                    <span className="item-name">
                    {this.props.name}
                    </span>
                    <span className="item-measurements">
                    {this.props.measurements}
                    </span>
                    {/*<span className="item-quantity">*/}
                    {/*{this.props.quantity}*/}
                    {/*</span>*/}
                    <span className="item-price">
                    {this.props.price}€
                    </span>
                    <button className="remove-item-button btn btn-default btn-xs" onClick={this.remove.bind(this)}>Delete</button>
                </div>
            </div>
        )
    }
}