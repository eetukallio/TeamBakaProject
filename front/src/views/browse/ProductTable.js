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
    }

    setUpHeaders() {

        let arr = this.state.headers.map(function (head) {
            return <th key={head}>{head}</th>;
        });
        return arr;
    }

    setUpTable() {
        console.log(this.state.type);

        let rows = [];

        if(this.state.type === "products") {
            rows = this.setProducts();
        } else if(this.state.type === "customers") {
            rows = this.setCustomers();
        } else if(this.state.type === "entries") {
            rows = this.setEntries();
        }
        return rows;
    }

    setProducts() {

        const tmp = this.props.data;
        const searchInput = this.props.searchInput;

        return tmp.filter(function (obj) {

            if (obj.name !== null) {
                return obj.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    obj.measurements.toLowerCase().includes(searchInput.toLowerCase());
            }

        }).map(function (obj) {
                console.log("map");
                 return <tr key={obj.id}>
                    <td key="name">{obj.name}</td>
                    <td key="price">{obj.price}</td>
                    <td key="measurements">{obj.measurements}</td>
                    <td key="image">{obj.imgUrl}</td>
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