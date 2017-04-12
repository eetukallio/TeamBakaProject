import React, { Component } from 'react';
import './Browse.css';
import Products from './browseComponents/Products';
import {Link} from 'react-router';

class Management extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerData: [],
            workerData: [],
            entryData: [],
            searchInput:""
        }
    }

    handleSearchInput(e) {
        const searchInput = e.target.value;
        console.log(e.target.value);
        this.setState({
            searchInput
        })
    }

    render() {
        return (
            <div  className="management">
                <div className="searchBar">
                    <input onChange={this.handleSearchInput.bind(this)} />
                </div>
                <div className="content">
                    <Products searchInput = {this.state.searchInput}  />
                </div>
            </div>
        );
    }
}

export default Management;