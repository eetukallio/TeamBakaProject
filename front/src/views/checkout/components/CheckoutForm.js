import React from 'react';
import { Button, Col, Grid, Row, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmedPassword: ''
        };
    }

    render() {
        return (
            <div className="checkoutForm">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Grid>
                        <Row>
                            <Col>
                                <FormGroup controlId="firstNameField" validationState={this.getFirstNameValidationState()}>
                                    <ControlLabel>First Name</ControlLabel>
                                    <FormControl type="text" name="firstName" value={this.props.data.firstName} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col >
                                <FormGroup controlId="lastNameField" validationState={this.getLastNameValidationState()}>
                                    <ControlLabel>Last Name</ControlLabel>
                                    <FormControl type="text" name="lastName" value={this.props.data.lastName} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup controlId="streetAddressField" validationState={this.getStreetAddressValidationState()}>
                                    <ControlLabel>Street Address</ControlLabel>
                                    <FormControl type="text" name="streetAddress" value={this.props.data.streetAddress} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col >
                                <FormGroup controlId="zipCodeField" validationState={this.getZipCodeValidationState()}>
                                    <ControlLabel>Zip Code</ControlLabel>
                                    <FormControl type="text" name="zipCode" value={this.props.data.zipCode} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <FormGroup controlId="cityField" validationState={this.getCityValidationState()}>
                                    <ControlLabel>City</ControlLabel>
                                    <FormControl type="text" name="city" value={this.props.data.city} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col >
                                <FormGroup controlId="streetAddressField" validationState={this.getCityValidationState()}>
                                    <ControlLabel>Country</ControlLabel>
                                    <FormControl type="text" name="country" value={this.props.data.country} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col >
                                <FormGroup controlId="submitButton">
                                    <div className="submitButtonDiv">
                                        <Button bsStyle="primary" type="submit">{this.props.btnText}</Button>
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

    mergeWithCurrentState(change) {
        return Object.assign(this.props.data, change);
    }

    emitChange(newState) {
        this.props.onChange(newState);
    }

    onSubmit(e) {
        e.preventDefault();

        const sendData = Object.assign(this.props.data, {isEmployer: this.props.data.isEmployer ? "1" : "0"});

        this.props.onSubmit(sendData);

        this.setState({confirmedPassword: ''});
    }

    getFirstNameValidationState() {
        if (this.props.data.firstName.length > 0 && !isNaN(this.props.data.firstName)) {
            return 'error';
        } else if (this.props.data.firstName.length > 0) {
            return 'success';
        }
    }

    getLastNameValidationState() {
        if (this.props.data.lastName.length > 0) {
            return 'success';
        }
    }

    getStreetAddressValidationState() {
        if (this.props.data.streetAddress.length > 0) {
            return 'success';
        }
    }

    getCityValidationState() {
        if (this.props.data.city.length > 0) {
            return 'success';
        }
    }

    getZipCodeValidationState() {
        if (this.props.data.zipCode.length > 4 && !isNaN(this.props.data.zipCode)) {
            return 'success';
        } else if (this.props.data.zipCode.length > 0)  {
            return 'warning';
        }
    }

    getCityValidationState() {
        if (this.props.data.city.length > 1) {
            return 'success';
        }
    }
}

// CheckoutForm.propTypes = {
//     onSubmit: React.PropTypes.func.isRequired,
//     onChange: React.PropTypes.func.isRequired,
//     btnText: React.PropTypes.string.isRequired,
//     data: React.PropTypes.object.isRequired
// };

export default CheckoutForm;