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

        const search = this.props.search;

        return (
            <ProductTable type="products" search={search}
                       data={this.state.data} />
        );
    }
}

export default Products;