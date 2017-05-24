/**
 * Created by Eetu Kallio on 24.5.2017.
 */
import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'

class ReviewForm extends Component {

    constructor(props){
        super(props);

    }

    render() {
        return(
            <form className="reviewForm" onSubmit={this.onSubmit}>
                <h3>Review this product:</h3>
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Your review</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="Review"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        )
    }
}

export default ReviewForm;