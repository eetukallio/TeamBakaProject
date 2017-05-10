import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import {addItem} from '../../actions/shoppingcart_actions';
import './ProductTable.css';
import {Pagination} from 'react-bootstrap';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type,
            sortBy: 'name',
            sortDir: 'ASC',
            prevSort: '',
            data: [],
            page: 1,
            productsPerPage: 10
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setProducts = this.setProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handlePageShift = this.handlePageShift.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setPageShifter = this.setPageShifter.bind(this);
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

    handlePageShift(eventKey) {
        this.setState({
            page: eventKey
        });
    }

    setPageShifter() {
        const { productsPerPage }  = this.state;
        const data = this.props.data;
        let items = 0;
        for (let i = 1; i <= Math.ceil(data.length / productsPerPage); i++) {
            items++;
        }
        return items;
    }

    setPage() {
        const { page, productsPerPage } = this.state;
        const data = this.props.data;
        console.log(data);
        console.log('Per page: ' + productsPerPage);
        console.log('Page: ' + page);
        const indexOfLastProduct = page * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        console.log( indexOfFirstProduct +', '+indexOfLastProduct);
        if (data !== []) {
            console.log(data.slice(indexOfFirstProduct, indexOfLastProduct));
            return data.slice(indexOfFirstProduct, indexOfLastProduct);
        }

    }


    setProducts(head) {

        console.log(head);
        console.log('setProducts');
        const page = this.setPage();
        const searchInput = this.props.searchInput;

        console.log(page);
        return page.filter(obj => {


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
            <div>
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
                <Pagination
                    bsSize="medium"
                    items={this.setPageShifter()}
                    activePage={this.state.page}
                    onSelect={this.handlePageShift} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stuff: state.shoppingCart
    }
}

export default connect(mapStateToProps, {addItem})(DataTable);