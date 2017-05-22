import React, { Component } from 'react';
import './Config.css';
import ProductForm from './forms/ProductForm';

class Config extends Component {

    render() {
        return (
            <div  className="config">
                <ProductForm/>
            </div>
        );
    }
}

export default Config;
