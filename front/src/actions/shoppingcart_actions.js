import { ADD_ITEM, REMOVE_ITEM, CLEAR_SHOPPINGCART, CHANGE_CHECKOUT_FORM } from '../constants/AppConstants';

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