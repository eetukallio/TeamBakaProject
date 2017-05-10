import React, { Component } from 'react';
// import './Products.css';
import ProductTable from '../ProductTable';
import axios from 'axios';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            headers: [
                "Product",
                "Image",
                "Price"
            ]
        };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        axios.get("/products")
            .then( (response) => {
                console.log(response);
                this.setState({data: response.data})
            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        return (
            <ProductTable type="products" searchInput={this.props.searchInput}
                       data={this.state.data} headers={this.state.headers}/>
        );
    }
}

export default Products;