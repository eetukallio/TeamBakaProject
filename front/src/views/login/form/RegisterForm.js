import React from 'react';
import { Button, Col, Grid, Row, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enableButton: false,
            confirmedPassword: ''
        };

        this.enableButton = this.enableButton.bind(this);
    }

    render() {
        return (
            <div className="register">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Grid>

                        <Row>
                            <Col xs={12} sm={8}>
                                <FormGroup controlId="userNameField" validationState={this.getUsernameValidationState()}>
                                    <ControlLabel> Username</ControlLabel>
                                    <FormControl type="text" name="username" value={this.props.data.username} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8}>
                                <FormGroup controlId="emailField" validationState={this.getEmailValidationState()}>
                                    <ControlLabel> Email</ControlLabel>
                                    <FormControl type="text" name="email" value={this.props.data.email} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="passwordField" validationState={this.getPasswordValidationState()}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="password" name="password" value={this.props.data.password} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="confirmPasswordField" validationState={this.getConfirmPasswordValidationState()}>
                                    <ControlLabel>Confirm password</ControlLabel>
                                    <FormControl type="password" name="confirmPassword" value={this.state.confirmedPassword} onChange={this.changeConfirmPassword.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="submitButton">
                                    <div className="submitButtonDiv">
                                        <Button bsStyle="primary" type="submit" disabled={this.enableButton()}>{this.props.btnText}</Button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </div>
        )
    }


    changeForm(e) {
        const name = e.target.name;
        console.log(name);
        const newState = this.mergeWithCurrentState({
            [name]: e.target.value
        });
        this.emitChange(newState);
    }

    changeConfirmPassword(e) {
        this.setState({
            confirmedPassword: e.target.value
        });
    }

    mergeWithCurrentState(change) {
        return Object.assign(this.props.data, change);
    }

    emitChange(newState) {
        this.props.onChange(newState);
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.getUsernameValidationState() === 'success' &&
            this.getConfirmPasswordValidationState() === 'success' &&
            this.getEmailValidationState() === 'success') {
            const sendData = Object.assign(this.props.data);

            this.props.onSubmit(sendData);

            this.setState({confirmedPassword: ''});
        }


    }

    getPasswordValidationState() {
        if (this.props.data.password.length > 1) {
            return 'success';
        }
    }

    getConfirmPasswordValidationState() {
        if (this.state.confirmedPassword.length > 0 && this.props.data.password === this.state.confirmedPassword) {
            return 'success';
        }
    }

    getEmailValidationState() {
        if (this.props.data.email.length > 1) {
            return 'success';
        }
    }

    getUsernameValidationState() {
        if (this.props.data.username.length > 1) {
            return 'success';
        }
    }

    enableButton() {
        if (this.getUsernameValidationState() === 'success' &&
            this.getConfirmPasswordValidationState() === 'success' &&
            this.getEmailValidationState() === 'success') {
            return false;
        } else {
            return true;
        }
    }
}

RegisterForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    btnText: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
};

export default RegisterForm;