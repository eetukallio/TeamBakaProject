/**
 * Created by Eetu Kallio on 22.5.2017.
 */

import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import axios from 'axios';

class CategoryForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value:'',
            name:''
        };

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const category = {
            name: this.state.name
        };

        axios.post("/categories", category)
            .then(response => {
                console.log(response);
                this.setState({
                    name: '',
                });

            }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <form className="productForm" onSubmit={this.onSubmit}>
                <h3>Add a new category:</h3>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder="Category"
                        onChange={this.handleChange}
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

export default CategoryForm;