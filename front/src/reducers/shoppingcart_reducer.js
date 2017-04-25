import { CHANGE_REGISTER_FORM, REGISTER_SENT, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    items: []
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {...state, formState: action.newState};
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
