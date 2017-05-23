import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import {login, changeForm} from '../../actions/auth';
import LoginForm from './form/LoginForm';
import './Login.css'

class Login extends React.Component {
    login(data) {
        this.props.login(data);
    }

    render() {
        const { formState, currentlySending } = this.props.data;
        return <div className="loginContainer">
            <div className="loginHeader">
                <h3>Log In</h3>
            </div>
            <div className="loginFormContainer">
                <LoginForm
                    data={formState}                    onChange={this.props.changeForm}
                    location={location}                 history={this.props.history}
                    onSubmit={this.login.bind(this)}    btnText={"Submit"}
                    currentlySending={currentlySending} errorMessage={this.props.data.errorMessage}
                />
            </div>

            <div className="alertContainer">
                {this.props.data.errorMessage === '' ? null :
                    <Alert bsStyle="warning">
                        Incorrect username or password
                    </Alert>}
            </div>

            </div>

    }
}

function mapStateToProps(state) {
    return {
        data: state.auth
    }
}

export default connect(mapStateToProps, {login, changeForm})(Login);