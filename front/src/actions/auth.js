import { SET_AUTH, SET_USER, REGISTER_SENT, UNAUTH_USER, CHANGE_FORM, CHANGE_REGISTER_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';
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
                console.log(res);
                cookie.save('token', res.data.token, {path: '/'});
                cookie.save('user', res.data.user, {path: '/'});
                axios.defaults.headers.common['Authorization'] = res.data.token;
                dispatch(sendingRequest(false));
                dispatch(setAuthState(res.data.user.isEmployer === 1));
                dispatch(setUser(res.data.user.id));
                browserHistory.push("/home");
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                // dispatch(setErrorMessage(err.response.statusText));
                console.log(err.message)
            });
    }
}

//logout
export function logout() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER});
        cookie.remove('token', {path: '/'});
        browserHistory.push("/login");
    }
}

export function register(formData) {
    console.log(formData);
    return function(dispatch) {
        dispatch(sendingRequest(true));

        axios.post("/register", JSON.stringify(formData), {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                console.log("REGISTRATION FORM SENT " + res);
                dispatch(sendingRequest(false));
                dispatch(registerFormSent());
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                console.log(err.message);
            });
    }
}


/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
    return { type: SET_AUTH, newState };
}

export function setUser(newState) {
    return { type: SET_USER, newState}
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

export function changeRegisterForm(newState) {
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