/**
 * Created by Eetu Kallio on 24.5.2017.
 */
import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'
import cookie from 'react-cookie';
import axios from 'axios';

class ReviewForm extends Component {

    constructor(props){
        super(props);

        console.log(cookie.load('user'));
        this.state = {
            reviewBody: "",
            user: cookie.load('user'),
            rating: 1
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            reviewBody: e.target.value
        })
    }

    handleRatingChange(e) {
        this.setState({
            rating: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const review = {
            user: this.state.user.id,
            body: this.state.reviewBody,
            rating: this.state.rating,
            product: this.props.product
        };
        axios.post('/reviews', review)
            .then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err)
        })
    }

    render() {
        return(
            <form className="reviewForm" onSubmit={this.onSubmit}>
                <h3>Review this product:</h3>
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Your review</ControlLabel>
                    <div className="textArea">
                        <FormControl
                            componentClass="textarea"
                            placeholder="Review"
                            onChange={this.handleChange}
                        />
                    </div>
                    <FormControl.Feedback />
                    <ControlLabel><span className="glyphicon glyphicon-star" /></ControlLabel>
                    <select onChange={this.handleRatingChange} value={this.state.rating}>
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>
                    </select>
                </FormGroup>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        )
    }
}

export default ReviewForm;