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
            rating: 1,
            ratingArray: [1,2,3,4,5]
        };

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
                this.setState({
                    reviewBody: "",
                    rating: 1
                });
                this.props.fetchReviews();
            }).catch(err => {
                console.log(err)
        })
    }

    render() {
        const {ratingArray} = this.state;
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
                            placeholder="Write your review here..."
                            value={this.state.reviewBody}
                            onChange={this.handleChange}
                        />
                    </div>
                    <FormControl.Feedback />
                    <ControlLabel><span className="glyphicon glyphicon-star" /></ControlLabel>
                    <select onChange={this.handleRatingChange} value={this.state.rating}>
                        <option value={ratingArray[0]}>1</option>
                        <option value={ratingArray[1]}>2</option>
                        <option value={ratingArray[2]}>3</option>
                        <option value={ratingArray[3]}>4</option>
                        <option value={ratingArray[4]}>5</option>




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