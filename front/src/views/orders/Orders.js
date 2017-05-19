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
            user: 1
        };

        this.fetchData = this.fetchData.bind(this);
        this.setDisplayedOrders = this.setDisplayedOrders.bind(this);
    }

    fetchData() {

        const {user} = this.state;

        axios.get("/purchases/user/" + user)
            .then( (response) => {

                this.setState({orders: response.data});
                console.log('fetching orders');
                console.log(this.state.orders);
            }).catch(err => console.log(err));


    }

    componentDidMount() {
        this.fetchData();
    }

    setDisplayedOrders() {
        const orders = this.state.orders;

        if (orders !== []) {
            let i = 1;
            return orders.map(obj => {
                i++;
                return <li key={i}>{obj.purchaseId}</li>
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