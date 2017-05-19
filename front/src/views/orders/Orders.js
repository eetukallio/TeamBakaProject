/**
 * Created by Eetu Kallio on 19.5.2017.
 */

import React, { Component } from 'react';
import axios from 'axios';

class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            user: 1,
            fetchDone: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.setDisplayedOrders = this.setDisplayedOrders.bind(this);
    }

    fetchData() {

        const {user} = this.state;

        axios.get("/purchases/user/" + user)
            .then( (response) => {
                console.log('fetching orders');
                this.setState({orders: response.data});
            })
            .then(() => {
                console.log('fetching products');
                let {orders} = this.state;
                orders.forEach(obj => {
                    let promises = [];
                    const productIds = obj.purchases;
                    productIds.forEach(obj => {
                        promises.push(axios.get('/products/' + obj));
                    });
                    let productObjects = [];
                    axios.all(promises).then(response =>{
                        response.forEach(obj => {
                            productObjects.push(obj.data);
                        });
                    });
                    obj.purchases = productObjects;
                });
                this.setState({
                    orders:orders,
                    fetchDone: true
                });
            }).catch(err => console.log(err));


    }

    componentDidMount() {
        this.fetchData();
    }

    setDisplayedOrders() {
        const {orders} = this.state;
        console.log(orders);
        if (this.state.fetchDone) {

            return orders.map(obj => {

                console.log(this.state.orders[0].purchases[0].name);
                return <li>lol</li>;
            })
        } else return <span>Loading...</span>;
    }

    render() {
        return (
            <div  className="paychecks">
                <ul>{this.setDisplayedOrders()}</ul>
            </div>
        );
    }
}

export default Orders;