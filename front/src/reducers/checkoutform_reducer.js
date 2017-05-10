import { CHANGE_CHECKOUT_FORM, CHECKOUT_SENT, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    formState: {
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        country: '',
    },
    currentlySending: false,
    errorMessage: ''
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_CHECKOUT_FORM:
            return {...state, formState: action.newState};
        case CHECKOUT_SENT:
            return {...state, formState: {
                firstName: '',
                lastName: '',
                streetAddress: '',
                city: '',
                zipCode: '',
                country: '',
            }};
        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending };
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
