import { ADD_ITEM, REMOVE_ITEM, CLEAR_SHOPPINGCART, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    items: ''
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    console.log("SHOPPING CART REDUCER HELLO");
    switch (action.type) {
        case ADD_ITEM:
            console.log("IN REDUCER: " + action);
            return {...state, items: "lol"};
        case REMOVE_ITEM:
            return {...state, items: [...state.items.slice(0, action.payload),
                    ...state.items.slice(action.payload + 1)]};
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
