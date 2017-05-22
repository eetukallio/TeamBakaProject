import React, { Component } from 'react';
import './Config.css';
import ProductForm from './forms/ProductForm';
import CategoryForm from './forms/CategoryForm'
import axios from 'axios';

class Config extends Component {

    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div  className="config">
                <ProductForm/>
                <CategoryForm/>
            </div>
        );
    }
}

export default Config;
