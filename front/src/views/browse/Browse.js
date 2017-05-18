import React, { Component } from 'react';
import './Browse.css';
import Products from './browseComponents/Products';
import {Link} from 'react-router';

/**
 * A Component representing the 'Browse' view.
 */
class Management extends Component {

    /**
     * A constructor which initializes the initial state of the component.
     *
     * @param props Props passed down from a parent.
     */
    constructor(props) {
        super(props);

        this.state = {
            productData: [],
        }
    }

    /**
     * The React render(). Renders a Products component as a child. Passes the search as a prop.
     *
     * @returns {XML} Returns the component as a HTML <div> element.
     */
    render() {
        const search = this.props.location.query.search;

        return (
            <div className="products">
                <div className="content">
                    <Products search = {search} />
                </div>
            </div>
        );
    }
}

export default Management;