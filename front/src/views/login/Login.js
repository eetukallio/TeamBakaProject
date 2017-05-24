import React from 'react';
import { connect } from 'react-redux';
import { Alert, Modal } from 'react-bootstrap';
import {login, register, changeForm, changeRegistrationForm} from '../../actions/auth';
import LoginForm from './form/LoginForm';
import './Login.css'
import RegisterForm from "./form/RegisterForm";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showModal: false
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    login(data) {
        this.props.login(data);
    }

    register(formData) {
        this.props.register(formData);
    }

    render() {
        const { formState, currentlySending } = this.props.data;
        const { registerFormState, registerCurrentlySending} = this.props.registerData;
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
            <div className="registerContainer">
                <p>Don't have an account? <a onClick={this.open}>Register here.</a></p>
            </div>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="addWorker">
                        <RegisterForm
                            data={registerFormState}                    onChange={this.props.changeRegistrationForm}
                            location={location}                         history={this.props.history}
                            onSubmit={this.register.bind(this)}         btnText={"Submit"}
                            currentlySending={registerCurrentlySending} errorMessage={this.props.data.errorMessage} />
                        {this.props.data.errorMessage === '' ? null :
                            <Alert bsStyle="warning">
                                Virhe, tarkista tiedot uudelleen.
                            </Alert>}
                    </div>
                </Modal.Body>
            </Modal>

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
        data: state.auth,
        registerData: state.register
    }
}

export default connect(mapStateToProps, {login, register, changeForm, changeRegistrationForm})(Login);