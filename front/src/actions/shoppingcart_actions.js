import { ADD_ITEM, REMOVE_ITEM, CLEAR_SHOPPINGCART, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

export function addItem(payload) {
    return { type: ADD_ITEM, payload }
}

export function removeItem(payload) {
    return { type: REMOVE_ITEM, payload }
}

export function clearItems() {
    return { type: CLEAR_SHOPPINGCART }
}