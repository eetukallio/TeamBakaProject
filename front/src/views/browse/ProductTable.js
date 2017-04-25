import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setProducts = this.setProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    setUpHeaders() {

        return this.state.headers.map(head => {
            return <th key={head}><div onClick={() => this.setProducts(head)}>{head}</div></th>;
        });
    }

    setUpTable() {
        console.log(this.state.type);

        let rows = [];

        if(this.state.type === "products") {
            rows = this.setProducts('Name');
        }
        return rows;
    }

    addToCart(obj) {
        console.log('add to cart:');
        console.log(obj);
    }

    setProducts(head) {

        console.log('setProducts');
        const tmp = this.props.data;
        const searchInput = this.props.searchInput;

        return tmp.filter(obj => {

            if (obj.name !== null) {
                return obj.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    obj.measurements.toLowerCase().includes(searchInput.toLowerCase());
            }

        }).sort((obj1, obj2) => {
            switch (head.toLowerCase()) {
                case 'name':
                    console.log(obj1.name);
                    return obj1.name-obj2.name;
                case 'price':
                    return obj1.price-obj2.price;
            }
        }).map(obj => {
                console.log("map");
                 return <tr key={obj.id}>
                    <td key="name">{obj.name}</td>
                    <td key="price">{obj.price}</td>
                    <td key="measurements">{obj.measurements}</td>
                    <td key="image">{obj.imgUrl}</td>
                     <td key="button"><button onClick={ () => this.addToCart(obj)} /></td>
                </tr>;
        });
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    {this.setUpHeaders()}
                </tr>
                </thead>
                <tbody>
                    {this.setUpTable()}
                </tbody>
            </Table>
        )
    }
}
 export default DataTable;