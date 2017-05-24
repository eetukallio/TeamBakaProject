/**
 * Created by Eetu Kallio on 11.5.2017.
 */
import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import {addItem} from '../../../actions/shoppingcart_actions';
import axios from 'axios';
import './ProductShowcase.css'
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import Review from './reviews/Review'
import ReviewForm from "./reviews/ReviewFrom";

/**
 * A component representing a single product in the product showcase view.
 * Note: relies heavily on query params to display the correct product.
 */
class ProductShowcase extends Component {

    /**
     * A constructor which initializes the initial state of the component and binds all of
     * the functions to the component's context.
     *
     * @param props Props passed down from a parent.
     */
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isAdmin: cookie.load('user') ? cookie.load('user').role === 'admin' : false,
            updatedStock:0,
            reviews:[],
            reviewsFetched: false
        };

        this.setProduct = this.setProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setReviews = this.setReviews.bind(this);
        this.setReviewForm = this.setReviewForm.bind(this);
        this.fetchReviews = this.fetchReviews.bind(this);
    }

    /**
     * Used to make an axios.get() to fetch data from a REST API. Uses the query.id param to determine
     * which object to fetch.
     */
    fetchData() {
        console.log(this.props.location.query.id);
        axios.get("/products/" + this.props.location.query.id)
            .then( (response) => {
                console.log(response);
                this.setState({data: response.data});
                this.fetchReviews();
            }).catch(err => console.log(err));
    }

    fetchReviews() {
        axios.get('/products/' + this.props.location.query.id +'/reviews')
            .then(response => {
                this.setState({
                    reviews: response.data._embedded.reviews,
                    reviewsFetched: true
                })
            }).catch(err => {console.log(err)});
    }

    /**
     * Invokes a Redux action to add an object to the shopping cart.
     *
     * @param obj The object that should be added to the shopping cart.
     */
    addToCart(obj) {
        console.log('add to cart:');
        console.log(obj);
        this.props.addItem(obj);
    }

    /**
     * A Component lifecycle method used to invoke the fetchData() at a proper time.
     */
    componentDidMount() {
        this.fetchData();
    }

    deleteProduct() {
        axios.delete("/products/" + this.state.data.id)
            .then( (response) => {
                console.log(response);
                browserHistory.push({
                    pathname: '/browse'
                });
            }).catch(err => console.log(err));

    }

    onSubmit() {
        const updatedStock = {
            stock:this.state.updatedStock
        };

        axios.patch('/products/'+ this.state.data.id, updatedStock)
            .then( response => {
                console.log(response);
                browserHistory.push({
                    pathname: '/item?id='+this.state.data.id
                });
            }).catch(err => {
                console.log(err);
        });
        return false;
    }

    setReviews() {
        const {reviewsFetched} =  this.state;
        return (
            reviewsFetched ?
                this.state.reviews.reverse().map(review => {
                    return <Review key={review.reviewId} data={review} />;
                })
                : <span>No reviews</span>
        );
    }

    setReviewForm() {
        return(
            <ReviewForm fetchReviews={this.fetchReviews} product={this.props.location.query.id} />
        )
    }

    handleChange(e) {
        const stock = e.target.value;
        this.setState({
            updatedStock: stock
        });
        console.log(this.state.updatedStock)
    }

    /**
     * Used to craft a <div> element representing the product that is showcased in the view.
     *
     * @returns {XML} Returns a <div> element representing the product.
     */
    setProduct() {
        const product = this.state.data;
        const {isAdmin} = this.state;

        return <div className="productContainer2">
            <div className="top2">
                <div className="productInfoContainer2">
                    <span className="productName2">
                        {product.name}
                    </span>
                    <div className="priceTag2">
                        <span className="price2">
                            {Number(product.price).toFixed(2)}€
                        </span>
                    </div>
                    <span className="productMeasurements2">
                       {product.measurements}
                    </span>
                    <span className="productStock2">
                    Stock: {product.stock}
                    </span>
                    <span className="additionalInfo2">{product.info}</span>
                    <span className="tags2">Tags: {product.tags}</span>

                </div>
                <img className="productImage2" src={product.imgUrl} alt="Not available" title="Product image" />
            </div>
            <OverlayTrigger trigger="click" placement="top" overlay={this.popoverTop} rootClose={true}>
                <button className="cartButton1 btn btn-primary" disabled={product.stock === 0} onClick={ () => this.addToCart(product)} >
                    {
                        product.stock === 0 ? 'OUT OF STOCK' : <span className="glyphicon glyphicon-shopping-cart "/>
                    }

                </button>
            </OverlayTrigger>
            {
                isAdmin ?
                    <div className="adminSet">
                        <button
                            className="stockInput btn btn-danger"
                            onClick={this.deleteProduct}>DELETE
                        </button>
                        {/*Update stock value:*/}
                        {/*<form onSubmit={this.onSubmit}>*/}
                            {/*<input*/}
                                {/*onChange={this.handleChange}*/}
                                {/*className="stockInput"*/}
                                {/*placeholder="Stock"*/}
                                {/*type="number"/>*/}
                            {/*<button type="submit" >Update</button>*/}
                        {/*</form>*/}
                    </div>
                    : null
            }
        </div>
    }

    popoverTop = (
        <Popover id="popover-positioned-top">
            Added to shopping cart!
        </Popover> );

    /**
     * The React render(). Calls setProduct() to render the entire component's layout.
     *
     * @returns {XML} Returns the component as a HTML <div> element.
     */
    render() {
        return (
            <div>
                {this.setProduct()}
                {cookie.load('user') ? this.setReviewForm() : null}
                {this.setReviews()}
            </div>
        )
    }
}

/**
 * Redux mapping.
 *
 * @param state Current state.
 * @returns {{stuff: *}}
 */
function mapStateToProps(state) {
    return {
        stuff: state.shoppingCart
    }
}

export default connect(mapStateToProps, {addItem})(ProductShowcase);