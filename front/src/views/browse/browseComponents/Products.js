import React, { Component } from 'react';
// import './Products.css';
import ProductTable from '../ProductTable';
import axios from 'axios';

/**
 * A component representing the 'Products' view.
 */
class Products extends Component {

    /**
     * A constructor which initializes the initial state of the component.
     *
     * @param props Props passed down from a parent.
     */
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.fetchData = this.fetchData.bind(this);
    }

    /**
     * Used to make an axios.get() to fetch objects from a REST API.
     */
    fetchData() {
        axios.get("/products")
            .then( (response) => {
                console.log(response);
                this.setState({data: response.data})
            }).catch(err => console.log(err));
    }

    /**
     * A Component lifecycle method used to invoke the fetchData() at a proper time.
     */
    componentDidMount() {
        this.fetchData();
    }

    /**
     * The React render(). Renders a ProductTable component as a child. Passes the search as a prop.
     *
     * @returns {XML} Returns the component as a HTML <div> element.
     */
    render() {

        const search = this.props.search;

        return (
            <ProductTable type="products" search={search}
                       data={this.state.data} />
        );
    }
}

export default Products;