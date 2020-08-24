import axios from 'axios';

import {
    LOAD_INDUSTRY_SUCCESS,
    LOAD_INDUSTRY_FAILURE,
    ADD_INDUSTRY_SUCCESS,
    ADD_INDUSTRY_FAILURE
} from './industry.types';
import { API } from '../../config';


export const loadIndustries = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    
    try {
        const res = await axios.get(`${API}/industries/`,config);
        console.log(res.data)
        dispatch({
            type: LOAD_INDUSTRY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            console.log(error.response)
            dispatch({
                type: LOAD_INDUSTRY_FAILURE,
                payload: error.response.data
            });
        
    };
};

export const createIndustry = ({name, id}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    
    const body = JSON.stringify({name});

    try {
        const res = await axios.post(`${API}/industry/create/${id}`, body, config);
        dispatch({
            type: ADD_INDUSTRY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            console.log(error.response)
            dispatch({
                type: ADD_INDUSTRY_FAILURE,
                payload: error.response.data
            });
        
    };
};