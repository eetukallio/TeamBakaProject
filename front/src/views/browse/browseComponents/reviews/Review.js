/**
 * Created by Eetu Kallio on 24.5.2017.
 */
import React, {Component} from 'react';
import axios from 'axios';

class Review extends Component {

    constructor(props){
        super(props);

        this.state = {
            user:{}
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.setStars = this.setStars.bind(this);
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        const review = this.props.data;
        console.log(review)
        axios.get('/users/' + review.user).then(response => {
            this.setState({
                user: response.data
            })
        });
    }

    setStars() {
        const review = this.props.data;
        let stars = [];
        for (let i = 0; i < review.rating; i++ ) {
            stars.push(<span key={i} className="glyphicon glyphicon-star" />)
        }
        return stars;
    }

    render() {

        const review = this.props.data;
        const {user} = this.state;

        return (
            <div className="reviewContainer">
                <span className="reviewUserName">{user.username}</span>
                <span className="reviewBody">{review.body}</span>
                <span className="rating">{this.setStars()}</span>
            </div>
        )
    }



}

export default Review;