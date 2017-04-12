import React, { Component } from 'react';
import './Products.css';
import DataTable from '../ProductTable';
import axios from 'axios';

class Workers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            headers: [
                "Name",
                "Price",
                "Measurements",
                "Image",
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
        return (
            <DataTable type="products" searchInput={this.props.searchInput}
                       data={this.state.data} headers={this.state.headers}/>
        );
    }
}

export default Workers;