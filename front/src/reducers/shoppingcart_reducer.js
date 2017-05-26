import { ADD_ITEM, REMOVE_ITEM, CLEAR_SHOPPINGCART, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    items: []
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            console.log(...state);
            return {...state, items: [...state.items, action.newItem]};
        case REMOVE_ITEM:
            return {items : state.items.filter( (item) => {
                console.log("ID IS " + item.id + " AND PAYLOAD IS " + action.payload);
                return item.id !== action.payload})};
        case CLEAR_SHOPPINGCART:
            return {...state, initialState };
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
