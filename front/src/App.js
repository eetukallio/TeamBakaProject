import React, { Component } from 'react';
import './App.css';
import Nav from './nav/Nav';

/**
 * The 'root' level component of the application. Rest of the components are this one's children.
 */
class App extends Component {

    /**
     * React render().
     *
     * @returns {XML} Returns a <div> element which serves as a container for the entire application.
     */
    render() {
        return (
            <div>
                <Nav />
                <div  className="site-content" id="site-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
