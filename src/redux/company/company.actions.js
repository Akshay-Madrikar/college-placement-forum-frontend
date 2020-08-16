import axios from 'axios';

import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
} from './company.types';
import { API } from '../../config';

export const createCompany = ({formData, id}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ formData });

    try {
        const res = await axios.post(`${API}/company/create/${id}`, body, config);
        dispatch({
            type: ADD_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            console.log(error.response)
            dispatch({
                type: ADD_COMPANY_FAILURE,
                payload: error.response.data
            });
        
    };
};