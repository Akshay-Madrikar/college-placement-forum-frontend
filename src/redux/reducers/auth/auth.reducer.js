import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILURE,
    USER_LOADED,
    AUTH_ERROR
} from './auth.types';

const INTIAL_STATE = {
    token: null,
    isAuthenticated: null,
    success: false,
    user: null,
    error: ''
};

const authReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {

        case USER_LOADED: 
            return {
                ...state,
                token: localStorage.getItem('token'),
                success: true,
                isAuthenticated: true
            };

        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                success: true
            };

        case SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        
        case SIGN_IN_SUCCESS:
            localStorage.setItem('token', action.payload.token); 
            return {
                ...state,
                user: action.payload.student,
                isAuthenticated: true,
                success: true
            };
        
        case SIGN_OUT_SUCCESS:
            if(typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }; 
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                success: true
            }
        
        case SIGN_IN_FAILURE:
        case SIGN_OUT_FAILURE: 
            return {
                ...state,
                token: null,
                error: action.payload.error,
                isAuthenticated: false
            };
        
        default:
            return state;
    };
};

export default authReducer;