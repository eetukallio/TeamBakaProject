import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export const checkAdmin = (ChildComponent) => {

    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                console.log("Not authenticated");
                browserHistory.push("/login");
            }
        }

        componentWillUpdate() {
            if (!this.props.isAuthenticated) {
                console.log("Not authenticated");
                browserHistory.push("/login");
            }
        }

        render() {
            return (
                <div className="authenticatedComponent">
                    {this.props.isAuthenticated ? <ChildComponent {...this.props}/> : null}
                </div>

            )
        }
    }

    function mapStateToProps(state) {
        console.log(state.auth.isAdmin);
        return { isAuthenticated: state.auth.isAdmin }
    }

    return connect(mapStateToProps)(Authenticate);
};