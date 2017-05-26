import { ADD_ITEM, REMOVE_ITEM, CLEAR_SHOPPINGCART, CHANGE_CHECKOUT_FORM, SENDING_REQUEST, CHECKOUT_SENT } from '../constants/AppConstants';
import axios from 'axios';

export function sendPurchase(data) {
    return function(dispatch) {
        dispatch(sendingRequest(true));
        axios.post('/purchases', data, {headers: {'Content-Type': 'Application/Json'}})
            .then((res) => {
                console.log(res);
                console.log("PURCHASE SENT");
                dispatch(sendingRequest(false));
                dispatch(checkoutSent());
            })
            .catch((err) => {
                console.log(err);
                dispatch(sendingRequest(false));
            });
    }
}

export function addItem(newItem) {
    console.log("IN ACTION: " + newItem);
    return { type: ADD_ITEM, newItem }
}

export function removeItem(payload) {
    console.log("IN REMOVE ITEM ACTION");
    console.log(payload);
    return { type: REMOVE_ITEM, payload }
}

export function clearItems() {
    return { type: CLEAR_SHOPPINGCART }
}

export function changeCheckoutForm(newState) {
    return {type: CHANGE_CHECKOUT_FORM, newState}
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return { type: SENDING_REQUEST, sending };
}

export function checkoutSent() {
    return { type: CHECKOUT_SENT };
}