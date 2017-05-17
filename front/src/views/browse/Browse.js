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
        return (
            <div className="products">
                <div className="content">
                    <Products />
                </div>
            </div>
        );
    }
}

export default Management;