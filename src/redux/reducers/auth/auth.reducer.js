import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} from './auth.types';

const INTIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: ''
};

const authReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {
        case SIGN_IN_SUCCESS:
            localStorage.setItem('token', action.payload.token); 
            return {
                ...state,
                user: action.payload.student,
                isAuthenticated: true,
                loading: false
            };
        case SIGN_IN_FAILURE:
            //localStorage.removeItem('token'); 
            return {
                ...state,
                token: null,
                error: action.payload.error,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    };
};

export default authReducer;