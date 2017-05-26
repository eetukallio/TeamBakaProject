import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

export default class CheckoutList extends Component {

    setUpHeaders() {
        return (
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        )
    }

    setUpTable() {
        const data = this.props.data.items;

        console.log(data);

        return data.map(obj => {
            return <tr key={obj.id}>
                <td key="name">{obj.name}</td>
                <td key="price">{obj.price}€</td>
            </tr>;
        });
    }

    setUpSummary() {
        const data = this.props.data.items;
        let price = 0;

        data.map(function (o) {
            price += o.price;
        });

        return (
            <tr>
                <td style={{borderBottom: 'hidden', borderLeft: 'hidden', background: 'white'}} />
                <td>{price}€</td>
            </tr>
        )
    }

    render() {
        return <Table striped bordered condensed>
            <thead>
            {this.setUpHeaders()}
            </thead>
            <tbody>
            {this.setUpTable()}
            {this.setUpSummary()}
            </tbody>
        </Table>
    }
}

CheckoutList.propTypes = {
    data: React.PropTypes.array.isRequired
};
