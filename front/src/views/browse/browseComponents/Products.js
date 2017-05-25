import React, { Component } from 'react';
// import './Products.css';
import ProductTable from '../ProductTable';
import Sidebar from './sidebar/Sidebar';
import './Products.css'
import axios from 'axios';
import LoadingButton from '../../login/form/LoadingButton';

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
            categories: [],
            categoryId: 1,
            products:[],
            fetchDone: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.setDisplayedContent = this.setDisplayedContent.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    /**
     * Used to make an axios.get() to fetch objects from a REST API.
     */
    fetchData() {
        axios.get("/categories")
            .then( (response) => {
                console.log(response.data._embedded.categories);
                this.setState({
                    categories: response.data._embedded.categories
                });

            }).catch(err => console.log(err));
    }

    fetchProducts(id) {
        axios.get('/categories/'+ id +'/products/')
            .then(response => {
                console.log(response);
                this.setState({
                    products:response.data._embedded.products,
                    fetchDone: true
                });
            }).catch(err => {console.log(err)})
    }

    handleCategoryChange(categoryId) {
        this.setState({
            categoryId:categoryId,
            fetchDone: false
        });
        this.fetchProducts(categoryId);
    }

    /**
     * A Component lifecycle method used to invoke the fetchData() at a proper time.
     */
    componentDidMount() {
        this.fetchData();
        this.fetchProducts(this.state.categoryId);
    }

    setDisplayedContent() {
        const {products} = this.state;
        const search = this.props.search;
        let displayedContent =<div className="noContentMsg">No content</div>;
        if (products.length > 0) {
            displayedContent = <ProductTable data={products}
                                             search={search}/>;
        }
        return displayedContent;
    }

    /**
     * The React render(). Renders a ProductTable component as a child. Passes the search as a prop.
     *
     * @returns {XML} Returns the component as a HTML <div> element.
     */
    render() {
        const {fetchDone} = this.state;
        console.log(this.state.categoryId);
        return (
            <div className="layoutContainer">
                <Sidebar data={this.state.categories}
                         handleCategoryChange={this.handleCategoryChange}
                         activeCategory={this.state.categoryId}/>
                {fetchDone ? this.setDisplayedContent() :<div className="productsLoading" ><LoadingButton/></div> }
            </div>
        );

    }
}

export default Products;