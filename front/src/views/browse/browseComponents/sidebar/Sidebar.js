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
            if (category.id === this.props.activeCategory) {
                return <a className="activeCategoryTitle"
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}>{category.name}</a>;
            } else {
                return <a className="categoryTitle"
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}>{category.name}</a>;
            }

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