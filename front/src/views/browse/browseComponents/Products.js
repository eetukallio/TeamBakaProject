import React, { Component } from 'react';
// import './Products.css';
import ProductTable from '../ProductTable';
import Sidebar from './sidebar/Sidebar';
import './Products.css'
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
            categories: [],
            categoryId: 1,
            fetchDone: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.setDisplayedContent = this.setDisplayedContent.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    /**
     * Used to make an axios.get() to fetch objects from a REST API.
     */
    fetchData() {
        axios.get("/categories")
            .then( (response) => {
                console.log(response);
                this.setState({
                    categories: response.data,
                    fetchDone: true
                })
            }).catch(err => console.log(err));
    }

    handleCategoryChange(categoryId) {
        this.setState({
            categoryId:categoryId
        })
    }

    /**
     * A Component lifecycle method used to invoke the fetchData() at a proper time.
     */
    componentDidMount() {
        this.fetchData();
    }

    setDisplayedContent() {
        const {categories} = this.state;
        const search = this.props.search;
        let displayedContent =<div className="noContentMsg">No content</div>;
        categories.forEach(category => {
            console.log(this.state.categoryId === category.categoryId && category.products.length > 0)
            if (this.state.categoryId === category.categoryId && category.products.length > 0) {
                displayedContent = <ProductTable data={category.products} search={search} />;
            }
        });
        return displayedContent;
    }

    /**
     * The React render(). Renders a ProductTable component as a child. Passes the search as a prop.
     *
     * @returns {XML} Returns the component as a HTML <div> element.
     */
    render() {
        if (this.state.fetchDone) {
            return (
                <div className="layoutContainer">
                    <Sidebar data={this.state.categories} handleCategoryChange = {this.handleCategoryChange}/>
                    {this.setDisplayedContent()}
                </div>
            );
        } else {
            return <span>LOADING...</span>
        }

    }
}

export default Products;