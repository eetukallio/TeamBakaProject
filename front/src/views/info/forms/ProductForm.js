/**
 * Created by Eetu Kallio on 22.5.2017.
 */

import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import axios from 'axios';

class ProductForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value:'',
            name:'',
            price:'',
            measurements:'',
            stock:'',
            url:'',
            info:'',
            tags:'',
            category:1,
            categories:[],
            fetchDone: false
        };

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onProductSubmit = this.onProductSubmit.bind(this);
        this.setCategories = this.setCategories.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    getValidationState() {

    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        axios.get('/categories')
            .then(response => {
                this.setState({
                    categories: response.data._embedded.categories,
                    fetchDone:true
                })
            }).catch(err => {
                  console.log(err)
            })
    }

    handleChange(e) {

        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.name)
    }

    onProductSubmit() {

        const product = {
            name: this.state.name,
            price: this.state.price,
            measurements: this.state.measurements,
            stock: this.state.stock,
            imgUrl: this.state.url,
            info: this.state.info,
            tags: this.state.tags,
            categoryId: this.state.category
        }

        console.log(product)

        axios.post("/products", product)
            .then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err)
        })
    }

    setCategories() {
        if (this.state.fetchDone) {
            const {categories} = this.state;
            return categories.map(obj => {
                return (
                    <option key={obj.id} value={obj.id} name={obj.name}>{obj.name}</option>
                )
            })
        }
    }

    handleSelect(e) {
        this.setState({
            category:e.target.value
        })
        const product = {
            name: this.state.name,
            price: this.state.price,
            measurements: this.state.measurements,
            stock: this.state.stock,
            url: this.state.url,
            info: this.state.info,
            tags: this.state.tags,
            categoryId: this.state.category
        }
        console.log(product)
    }

    render() {
        return (
            <form className="productForm" onSubmit={this.onProductSubmit}>
                <h3>Add a new product:</h3>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Measurements</ControlLabel>
                    <FormControl
                        type="text"
                        name="measurements"
                        placeholder="0cm x 0cm x 0cm"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Initial stock</ControlLabel>
                    <FormControl
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>URL</ControlLabel>
                    <FormControl
                        type="text"
                        name="url"
                        placeholder="http://example.com"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Info</ControlLabel>
                    <FormControl
                        type="text"
                        name="info"
                        placeholder="Additional info"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Tags (separate with comma)</ControlLabel>
                    <FormControl
                        type="text"
                        name="tags"
                        placeholder="tag,tag,tag"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Category</ControlLabel>
                    <FormControl
                        onChange={this.handleSelect}
                        componentClass="select"
                        placeholder="Category">
                        {this.setCategories()}
                    </FormControl>
                </FormGroup>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        );
    }
}

export default ProductForm;