import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

export default class ShoppingCartTable extends Component {

    setUpHeaders() {
        return (
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Measurements</th>
                <th>Image</th>
            </tr>
        )
    }

    setUpTable() {
        const data = this.props.data.items;

        console.log(data);

        return data.map(obj => {
            console.log("map");
            return <tr key={obj.id}>
                <td key="name">{obj.name}</td>
                <td key="price">{obj.price}</td>
                <td key="measurements">{obj.measurements}</td>
                <td key="image">{obj.imgUrl}</td>
                <td key="button"><button onClick={ () => this.props.onRemove(obj.id)} /></td>
            </tr>;
        });
    }

    render() {
        return <Table striped bordered condensed hover>
            <thead>
            {this.setUpHeaders()}
            </thead>
            <tbody>
            {this.setUpTable()}
            </tbody>
        </Table>
    }
}

ShoppingCartTable.propTypes = {
    onRemove: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired
};
