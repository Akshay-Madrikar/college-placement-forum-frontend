import axios from 'axios';

import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} from './auth.types';
import { API } from '../../../config';

export const signIn = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    
    try {
        const res = await axios.post(`${API}/signin`, body, config);
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