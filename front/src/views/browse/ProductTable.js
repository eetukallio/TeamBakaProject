import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {addItem} from '../../actions/shoppingcart_actions';
import './ProductTable.css';
import {Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import Scroll from 'react-scroll';

/**
 * Component used to render the products in a table-like grid. Handles most of the logic
 * behind the features in said view, such as sorting.
 *
 * The products to be viewed in this view should be passed down to it via an object-array prop 'data'.
 */
class DataTable extends Component {

    /**
     * A constructor which initializes the initial state of the component and binds all of
     * the functions to the component's context.
     *
     * @param props Props passed down from a parent should contain at least 'data': an array of objects.
     * You may also pass a 'search' value, which will be used to filter the content before rendering.
     */
    constructor(props) {

        super(props);

        this.state = {
            sortBy: 'price',
            sortDir: 'ASC',
            data: [],
            page: 1,
            productsPerPage: 9,
            search: ''
        };

        this.setProducts = this.setProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handlePageShift = this.handlePageShift.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setPageShifter = this.setPageShifter.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.searchLogic = this.searchLogic.bind(this);
    }

    /**
     * Sets the sorting states to match the users selection based on an event triggered in a Dropdown component.
     *
     * @param eventKey The event key representing the users selection.
     */
    setSorting(eventKey){

        console.log(eventKey);

        switch (eventKey) {
            case '1':
                this.setState({sortBy: 'price'});
                console.log(this.state.sortBy);
                break;
            case '2':
                this.setState({sortBy: 'name'});
                console.log(this.state.sortBy);
                break;
            case '3':
                this.setState({sortDir: 'ASC'});
                console.log(this.state.sortBy);
                break;
            case '4':
                this.setState({sortDir: 'DES'});
                console.log(this.state.sortBy);
                break;
            default:
                break;
        }
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
     * Handles the page shifting (state change) happening when the user selects an option from the Pagination component.
     *
     * @param eventKey The event key holding a value corresponding the page to transition to.
     */
    handlePageShift(eventKey) {
        this.setState({
            page: eventKey
        });
        Scroll.animateScroll.scrollToTop();
        Scroll.scrollSpy.update();
    }

    /**
     * Used to inflate the Pagination component with a correct amount of pages. Some real fancy math right there.
     *
     * @returns {number} Returns the amount of pages needed for all products as a number.
     */
    setPageShifter() {
        const { productsPerPage }  = this.state;
        const data = this.props.data.filter(this.searchLogic);
        let items = 0;
        for (let i = 1; i <= Math.ceil(data.length / productsPerPage); i++) {
            items++;
        }
        return items;
    }

    /**
     * Used to apply the search logic to a filter(). Modifying the search logic can be done solely here.
     *
     * @param obj The filtered object.
     * @returns {boolean} Returns true if the filtered object is to be included in the filtered array, false if not.
     */
    searchLogic(obj) {
        if (this.props.search !== undefined) {
            const search = this.props.search;
            return obj.name.toLowerCase().includes(search.toLowerCase()) ||
                obj.tags.toLowerCase().includes(search.toLowerCase());
        }
        return true;
    }

    /**
     * Used to determine the objects that should be rendered on the currently displayed page. Sorting the
     * array holding all of the objects is done here to make sure the user has the correct products in the view.
     *
     * @returns {Array.<{object}>} Returns an array holding the objects to be viewed on the current page.
     */
    setPage() {
        const { page, productsPerPage, sortBy, sortDir } = this.state;
        const data = this.props.data;

        const sortedData = data.filter(this.searchLogic).sort((a, b) => {
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
            } else if (sortBy === 'price') {
                if (sortDir === 'ASC') {
                    return a.price-b.price;
                } else {
                    return b.price-a.price;
                }
            } else {
                return 0;
            }
        });
        console.log('Per page: ' + productsPerPage);
        console.log('Page: ' + page);
        const indexOfLastProduct = page * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        console.log( indexOfFirstProduct +', '+indexOfLastProduct);
        if (sortedData !== []) {
            console.log(sortedData.slice(indexOfFirstProduct, indexOfLastProduct));
            return sortedData.slice(indexOfFirstProduct, indexOfLastProduct);
        }

    }

    /**
     * Maps an array of <div> elements based on the objects that should be viewed on the current page.
     *
     * @returns {Array} Returns an array of <div> elements based on the objects that
     * should be viewed on the current page.
     */
    setProducts() {

        console.log('setProducts');
        const page = this.setPage();

        console.log(page);
        return page.map(obj => {
                 return <div key={obj.id} className="productRowContainer">
                     <div className="top1">
                         <div className="productInfoContainer1">
                             <Link to={{ pathname: '/item', query: { id: obj.id } }}>
                                 <span className="productName1">{obj.name}</span>

                                 <div className="priceTag1">
                                    <span className="price1">
                                        {obj.price > 0 ? Number(obj.price).toFixed(2) + '€' : 'FREE'}

                                    </span>
                                 </div>
                                 <span className="productMeasurements1">{obj.measurements}</span>
                                 <span className={obj.stock > 0 ? "productStock1" : "productStockLow1"}>
                                     {obj.stock === 0 ? 'OUT OF STOCK' : 'In stock: ' + obj.stock}
                                     </span>
                                 <span className="additionalInfo1">{obj.info}</span>

                             </Link>
                        </div>
                        <img className="productImage1" src={obj.imgUrl} alt="Not available" title="Product image" />
                     </div>
                     <button className="cartButton1" onClick={ () => this.addToCart(obj)} >
                         {
                             obj.stock === 0 ? 'OUT OF STOCK' : <span className="glyphicon glyphicon-shopping-cart "/>
                         }

                     </button>
                 </div>;
        });
    }

    /**
     * The React render(). Calls various functions in this class to render the entire component's layout.
     *
     * @returns {XML} Returns the component as a HTML <div> element.
     */
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

                {this.setProducts()}

                <div className="pagination">
                    <Pagination
                        bsSize="medium"
                        items={this.setPageShifter()}
                        activePage={this.state.page}
                        onSelect={this.handlePageShift} />
                </div>
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

export default connect(mapStateToProps, {addItem})(DataTable);