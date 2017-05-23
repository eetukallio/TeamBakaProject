import { CHANGE_REGISTER_FORM, REGISTER_SENT, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    registerFormState: {
        password: '',
        confirmPassword: '',
        username: '',
        email: ''
    },
    registerCurrentlySending: false,
    errorMessage: ''
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_REGISTER_FORM:
            return {...state, registerFormState: action.newState};
        case REGISTER_SENT:
            return {...state, initialState};
        case SENDING_REQUEST:
            return {...state, registerCurrentlySending: action.sending };
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
