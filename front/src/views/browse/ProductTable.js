import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import {addItem} from '../../actions/shoppingcart_actions';
import './ProductTable.css';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type,
            sortBy: 'name',
            sortDir: 'ASC',
            prevSort: ''
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setProducts = this.setProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    setUpHeaders() {

        return this.state.headers.map(head => {
            return <th key={head}><div onClick={() => this.setSorting(head)}>{head}</div></th>;
        });
    }

    setSorting(head){

        this.setState({sortBy:head});
        if (this.state.sortBy !== this.state.prevSort) this.setState({prevSort:this.state.sortBy});
        this.state.sortDir === 'ASC' ? this.setState({sortDir:'DESC'}) : this.setState({sortDir:'ASC'});
    }

    setUpTable() {
        console.log(this.state.type);

        let rows = [];

        if(this.state.type === "products") {
            rows = this.setProducts(this.state.sortBy);
        }
        return rows;
    }

    addToCart(obj) {
        console.log('add to cart:');
        console.log(obj);
        this.props.addItem(obj);
    }

    setProducts(head) {

        console.log(head);
        const tmp = this.props.data;
        const searchInput = this.props.searchInput;

        console.log(tmp);
        return tmp.filter(obj => {

            if (obj.name !== null) {
                return obj.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    obj.measurements.toLowerCase().includes(searchInput.toLowerCase());
            }

        }).sort((obj1, obj2) => {

            if (this.state.sortDir === 'ASC') {
                switch (head.toLowerCase()) {
                    case 'name':
                        // console.log(obj1.name);
                        if ( obj1.name < obj2.name ) return -1;
                        if ( obj1.name > obj2.name ) return 1;
                        return 0;
                    case 'price':
                        // console.log('price');
                        return obj1.price-obj2.price;
                    case 'measurements':
                        // console.log(obj1.name);
                        return ( obj1.measurements.split('cm')[0] - obj2.measurements.split('cm')[0] );
                }
            }
            if (this.state.sortDir === 'DESC') {
                switch (head.toLowerCase()) {
                    case 'name':
                        // console.log(obj1.name);
                        if ( obj1.name < obj2.name ) return 1;
                        if ( obj1.name > obj2.name ) return -1;
                        return 0;
                    case 'price':
                        // console.log('price');
                        return obj2.price-obj1.price;
                    case 'measurements':
                        // console.log(obj1.name);
                        return ( obj2.measurements.split('cm')[0] - obj1.measurements.split('cm')[0] );
                }
            }

        }).map(obj => {
                console.log("map");
                 return <tr key={obj.id}>
                    <td key="product">
                        <div className="productInfoContainer">
                            <span className="productName">{obj.name}</span><br/><br/>
                            <span className="productMeasurements">{obj.measurements}</span><br/>
                            <span className="productStock">In stock: {obj.stock}</span>
                        </div>
                    </td>
                     <td key="image">
                         <img className="productImage" src={obj.imgUrl} alt="Not available" title="Product image" />
                     </td>
                     <td key="price">
                         <div className="priceTag">
                         <span className="price">
                             {Number(obj.price).toFixed(2)}€
                         </span>
                         </div>
                     </td>
                     <td key="button" className="cartButtonContainer">
                         <button className="cartButton" onClick={ () => this.addToCart(obj)} >
                         <span className="glyphicon glyphicon-shopping-cart "/>
                     </button>
                     </td>
                 </tr>;
        });
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr >
                    {this.setUpHeaders()}
                </tr>
                </thead>
                <tbody>
                    {this.setUpTable(this.state.sortBy)}
                </tbody>
            </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
        stuff: state.shoppingCart
    }
}

export default connect(mapStateToProps, {addItem})(DataTable);