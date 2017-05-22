/**
 * Created by Eetu Kallio on 22.5.2017.
 */

import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

class ProductForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value:''
        };

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form className="productForm" onSubmit={this.props.onProductSubmit}>
                <h3>Add a new product:</h3>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Measurements</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Initial stock</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                    <ControlLabel>URL</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Info</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                    <ControlLabel>Tags (separate with comma)</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        );
    }
}

export default ProductForm;