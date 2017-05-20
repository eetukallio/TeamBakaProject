/**
 * Created by Eetu Kallio on 21.5.2017.
 */

import  React, {Component} from 'react';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.setDisplayedContent = this.setDisplayedContent.bind(this);
    }

    setDisplayedContent() {
        const categories = this.props.data;
        const handleCategoryChange = this.props.handleCategoryChange;
        return categories.map( category => {
            return <a className="categoryTitle"
                      key={category.categoryId}
                      onClick={() => handleCategoryChange(category.categoryId)}>{category.name}</a>;
        } )
    }

    render() {

        return <div className="sideBar">
            <div className="sidebarHeader">Categories</div>
            {this.setDisplayedContent()}
            </div>
    }

}

export default Sidebar;