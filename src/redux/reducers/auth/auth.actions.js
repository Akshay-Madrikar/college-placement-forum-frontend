import axios from 'axios';

import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILURE,
    USER_LOADED,
    AUTH_ERROR
} from './auth.types';
import { API } from '../../../config';
import setAuthToken from '../../../utils/setAuthToken' 

export const loadUser = () => (dispatch) => {

    setTimeout(() => {
        if(!localStorage.token) {
            dispatch({
                type: AUTH_ERROR,
                payload: false
            });
        } else {
            if(typeof window !=='undefined') {
                setAuthToken(localStorage.token);
                dispatch({
                    type: USER_LOADED
                })
            }
        }
    }, 200);
};

export const signUp = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password });
    
    try {
        const res = await axios.post(`${API}/signup`, body, config);
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: res.data
        });
    } catch(error) {
            dispatch({
                type: SIGN_UP_FAILURE,
                payload: error.response.data
            });
        
    };
};

export const signIn = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    
    try {
        const res = await axios.post(`${API}/signin`, body, config);
        console.log(res.data)
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: res.data
        });
    } catch(error) {
            dispatch({
                type: SIGN_IN_FAILURE,
                payload: error.response.data
            });
        
    };
};

export const signOut = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    
    try {
        const res = await axios.get(`${API}/signout`,config);
        dispatch({
            type: SIGN_OUT_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            console.log(error.response)
            dispatch({
                type: SIGN_OUT_FAILURE,
                payload: error.response.data
            });
        
    };
};