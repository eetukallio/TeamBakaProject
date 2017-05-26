/**
 * Created by Eetu Kallio on 20.5.2017.
 */

/**
 * Created by Eetu Kallio on 19.5.2017.
 */

import React, { Component } from 'react';
import axios from 'axios';

class SingleOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchDone: false,
            products: [],
            displayInfo: false,
            totalPrice: 0
        };

        this.fetchData = this.fetchData.bind(this);
        this.setDisplayedOrder = this.setDisplayedOrder.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    fetchData() {

        let promises = [];
        const products = this.props.order.purchases;
        let productObjects = [];
        products.forEach(product => {
           promises.push(axios.get('/products/'+product))
        });
        axios.all(promises)
            .then( (response) => {
                console.log('fetching products');
                let totalPrice = 0;
                response.forEach(response => {
                    productObjects.push(response.data);
                    totalPrice += response.data.price;
                });

                this.setState({
                    products: productObjects,
                    fetchDone: true,
                    totalPrice: totalPrice
                });
            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchData();
    }

    toggleInfo() {

        let {displayInfo} = this.state;

        displayInfo === false ? displayInfo = true : displayInfo = false;

        this.setState({
            displayInfo: displayInfo
        })
    }

    setDisplayedOrder() {
        const {products} = this.state;
        console.log(this.state.fetchDone);
        console.log(products);
        if (this.state.fetchDone && this.state.displayInfo) {
            let key = 0;
            return products.map(product => {
                key++;
                return <div key={key} className="singleProductContainer">
                    <span className="productName">{product.name} </span>
                    <span className="productPrice">{Number(product.price).toFixed(2)}€</span>
                </div>
            })
        } else return null;
    }

    render() {
        const order = this.props.order;

        return (
            <div className="singleOrderContainer">
                <a className="orderHeader" onClick={this.toggleInfo}>
                    <span>Order ID: {order.purchaseId}</span>
                    <span className="totalPrice">Total: {this.state.totalPrice} €</span>
                </a>
                <div className="orderInfo">
                    {this.setDisplayedOrder()}
                </div>
            </div>
        ) ;
    }
}

export default SingleOrder;