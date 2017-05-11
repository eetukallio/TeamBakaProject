/**
 * Created by Eetu Kallio on 11.5.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addItem} from '../../../actions/shoppingcart_actions';
import axios from 'axios';
import './ProductShowcase.css'

class ProductShowcase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.setProduct = this.setProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        console.log(this.props.location.query.id);
        axios.get("/products/" + this.props.location.query.id)
            .then( (response) => {
                console.log(response);
                this.setState({data: response.data})
            }).catch(err => console.log(err));
    }

    addToCart(obj) {
        console.log('add to cart:');
        console.log(obj);
        this.props.addItem(obj);
    }

    componentDidMount() {
        this.fetchData();
    }

    setProduct() {
        const product = this.state.data;
        return <div className="productContainer">
            <span className="productName">
                {product.name}
            </span>
            <img className="productImage" src={product.imgUrl} alt="Not available" title="Product image" />
            <br/><br/>
            <div className="productInfo">
                <span className="productMeasurements">
                    {product.measurements}
                </span>
                <br/><br/>
                <span className="productStock">
                    Stock: {product.stock}
                </span>

            </div>
            <br/><br/>
            <div className="priceTag">
                <span className="price">
                    {Number(product.price).toFixed(2)}€
                </span>
            </div>

        </div>
    }

    render() {
        return (
            <div>
                {this.setProduct()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stuff: state.shoppingCart
    }
}

export default connect(mapStateToProps, {addItem})(ProductShowcase);