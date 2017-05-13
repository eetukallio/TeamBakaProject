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
            <div className="leftSide2">
            <span className="productName2">
                {product.name}
            </span> <br/> <br/>
                <div className="priceTag2">
                <span className="price2">
                    {Number(product.price).toFixed(2)}€
                </span>
                </div>
                <br/><br/>
                <div className="productInfo1">
                <span className="productMeasurements1">
                    {product.measurements}
                </span>
                    <br/><br/>
                    <span className="productStock1">
                    Stock: {product.stock}
                </span>
                    <br/><br/>
                    <span className="additionalInfo1">{product.info}</span>
                    <br/><br/>

                    <br/>
                    <div key="button" className="cartButtonContainer2">
                        <button className="cartButton2" onClick={ () => this.addToCart(product)} >
                            <span className="glyphicon glyphicon-shopping-cart "/>
                        </button>
                    </div>

                </div>
            </div>
            <div className="rightSide2">
                <img className="productImage2" src={product.imgUrl} alt="Not available" title="Product image" />
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