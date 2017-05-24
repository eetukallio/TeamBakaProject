import React, { Component } from 'react';
import ShoppingCartItem from './ShoppingCartItem';

export default class ShoppingCartTable extends Component {

    setUpItems() {
        const data = this.props.data.items;

        console.log(data);

        let key = 0;

        return data.map(obj => {
            console.log("map");
            key++;
            return <ShoppingCartItem key={key} id={obj.id} name={obj.name} imgUrl={obj.imgUrl} measurements={obj.measurements} price={obj.price} onRemove={this.props.onRemove}
            />;
        });
    }

    render() {
        return <div className="shopping-cart-table">
            {this.setUpItems()}
        </div>
    }
}

ShoppingCartTable.propTypes = {
    onRemove: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired
};
