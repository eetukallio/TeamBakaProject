import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {addItem} from '../../actions/shoppingcart_actions';
import './ProductTable.css';
import {Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import Scroll from 'react-scroll';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            sortBy: 'name',
            sortDir: 'ASC',
            data: [],
            page: 1,
            productsPerPage: 10
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setProducts = this.setProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handlePageShift = this.handlePageShift.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setPageShifter = this.setPageShifter.bind(this);
    }

    setSorting(eventKey){

        console.log(eventKey);

        switch (eventKey) {
            case 1:
                this.setState({sortBy: 'price'});
                break;
            case 2:
                this.setState({sortBy: 'name'});
                break;
            case 3:
                this.setState({sortDir: 'ASC'});
                break;
            case 4:
                this.setState({sortDir: 'DES'});
                break;
        }
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
        Scroll.animateScroll.scrollToTop();
        Scroll.scrollSpy.update();
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
        const { page, productsPerPage, sortBy, sortDir } = this.state;
        const data = this.props.data.sort((a, b) => {
            console.log('sorting');
            if (sortBy === 'name') {
                if (sortDir === 'ASC') {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                } else {
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                }
            } else {
                if (sortDir === 'ASC') {
                    return a-b;
                } else {
                    return b-a;
                }
            }
        });
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


    setProducts() {

        console.log('setProducts');
        const page = this.setPage();

        console.log(page);
        return page.map(obj => {
                console.log("map");
                console.log(obj.productId);
                 return <div key={obj.productId} className="productRowContainer">
                     <div className="top">
                         <div className="productInfoContainer">
                             <Link to={{ pathname: '/item', query: { id: obj.productId } }}>
                                 <span className="productName">{obj.name}</span>

                                 <div className="priceTag1">
                                    <span className="price1">
                                        {Number(obj.price).toFixed(2)}€
                                    </span>
                                 </div>
                                 <span className="productMeasurements1">{obj.measurements}</span><br/><br/>
                                 <span className="productStock1">In stock: {obj.stock}</span><br/><br/>
                                 <span className="additionalInfo1">{obj.info}</span><br/><br/>

                             </Link>
                        </div>
                        <img className="productImage1" src={obj.imgUrl} alt="Not available" title="Product image" />
                     </div>
                     <button className="cartButton1" onClick={ () => this.addToCart(obj)} >
                         <span className="glyphicon glyphicon-shopping-cart "/>
                     </button>
                 </div>;
        });
    }

    render() {
        return (
            <div className="productListContainer">

                <div className="sort">
                    <DropdownButton onSelect={this.setSorting} bsStyle="default" title="Sort by" id="dropdown-basic">
                        <MenuItem eventKey="1"> Price </MenuItem>
                        <MenuItem eventKey="2"> Name </MenuItem>
                    </DropdownButton>
                    <DropdownButton onSelect={this.setSorting} bsStyle="default" title="Direction" id="dropdown-basic">
                        <MenuItem eventKey="3"> Ascending </MenuItem>
                        <MenuItem eventKey="4"> Descending </MenuItem>
                    </DropdownButton>
                </div>
                {this.setUpTable(this.state.sortBy)}

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