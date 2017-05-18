import React, { Component } from 'react';
import './Browse.css';
import Products from './browseComponents/Products';
import {Link} from 'react-router';

class Management extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productData: [],
        }
    }

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