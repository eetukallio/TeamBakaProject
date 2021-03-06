/**
 * Created by Eetu Kallio on 19.5.2017.
 */

import React, { Component } from 'react';
import axios from 'axios';
import SingleOrder from './ordersComponents/SingleOrder';
import './Orders.css';
import cookie from 'react-cookie';

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            user: cookie.load('user').id,
            fetchDone: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.setDisplayedOrders = this.setDisplayedOrders.bind(this);
    }

    fetchData() {

        const {user} = this.state;

        axios.get("/users/" + user + "/purchases")
            .then( (response) => {
                console.log('fetching orders');
                this.setState({
                    orders: response.data._embedded.purchases,
                    fetchDone: true
                });

            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchData();
    }

    setDisplayedOrders() {
        const {orders} = this.state;
        console.log(this.state.fetchDone);
        console.log(orders);
        if (this.state.fetchDone) {

            let key = 1;
            return orders.map(obj => {
                key++;
                return <SingleOrder key={key} order = {obj}/>;
            })
        } else return <span>Loading...</span>;
    }

    render() {
        return (
            <div  className="ordersContainer">
                {this.setDisplayedOrders()}
            </div>
        );
    }
}

export default Orders;