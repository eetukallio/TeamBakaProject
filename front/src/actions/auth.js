import { SET_AUTH, CHECKOUT_SENT, SET_USERNAME, REGISTER_SENT, UNAUTH_USER, CHANGE_FORM, CHANGE_REGISTER_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';

export function login(data) {
    return function(dispatch) {
        dispatch(sendingRequest(true));

        console.log("LOGIN INFO BEING SENT AS " + data);

        axios.post("/login", data, {headers: {'Content-Type': 'Application/Json'}})
            .then((res) => {
                console.log("=====RESPONSE WAS======");
                console.log(res.data.user);
                const user = res.data.user;
                cookie.save('token', res.data.token, {path: '/'});
                cookie.save('user', {id: res.data.userId, username: user.username, role: user.role, address: user.address}, {path: '/'});
                axios.defaults.headers.common['Authorization'] = res.data.token;
                dispatch(sendingRequest(false));
                dispatch(setAuthState(res.data.user.role === "admin"));
                dispatch(setUser(user.username));
                // dispatch(setUser(res.data.userId));
                dispatch(forwardTo("/"));
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                // dispatch(setErrorMessage(err.response.statusText));
                console.log(err)
            });
    }
}

//logout
export function logout() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER});
        dispatch({type: CHECKOUT_SENT});
        cookie.remove('token', {path: '/'});
        cookie.remove('user', {path: '/'});
        browserHistory.push("/login");
    }
}

export function register(formData) {
    console.log(formData);

    const userData = {  username: formData.username,
                        password: formData.password,
                        email: formData.email,
                        role: formData.role
                        };

    const addressData = {   firstName: formData.firstName,
                            lastName: formData.lastName,
                            streetAddress: formData.streetAddress,
                            city: formData.city,
                            zipCode: formData.zipCode,
                            country: formData.country,
                            user: 0
                            };

    console.log(userData);
    console.log(addressData);


    return function(dispatch) {
        dispatch(sendingRequest(true));

        axios.post("/users", userData, {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log("USER WAS SENT");
                const addressWithUser = Object.assign(addressData, {user: res.data.id});
                axios.post("/shippingAddresses", addressWithUser, {headers: {'Content-Type': 'application/json'}})
                    .then((res) => {
                        console.log("ADDRESS WAS SENT");
                        dispatch(sendingRequest(false));
                        dispatch(registerFormSent());
                        dispatch(setErrorMessage("success"))
                })
                    .catch((err) => {
                        dispatch(sendingRequest(false));
                        dispatch(setErrorMessage("error"))
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                console.log(err.message);
            });
    }
}


/**
 * Sets the authentication state of the application
 * @param {boolean} isAdmin True means a user is logged in, false means no user is logged in
 */
export function setAuthState(isAdmin) {
    return { type: SET_AUTH, isAdmin };
}

export function setUser(username) {
    return { type: SET_USERNAME, username}
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return { type: CHANGE_FORM, newState };
}

export function changeRegistrationForm(newState) {
    return { type: CHANGE_REGISTER_FORM, newState}
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return { type: SENDING_REQUEST, sending };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({ type: SET_ERROR_MESSAGE, message });
    }
}

function registerFormSent() {
    return { type: REGISTER_SENT}
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
    console.log('forwardTo(' + location + ')');
    browserHistory.push(location);
}