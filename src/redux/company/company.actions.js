import axios from 'axios';

import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    FILTER_SEARCH_COMPANY_SUCCESS,
    FILTER_SEARCH_COMPANY_FAILURE
} from './company.types';
import { API } from '../../config';

export const createCompany = ({formData, imageData, id}) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ 
                    formData, 
                    pic: {
                        cloudinary_url: imageData.url,
                        cloudinary_id: imageData.cloudinary_id 
                    } 
    });

    try {
        const res = await axios.post(`${API}/company/create/${id}`, body, config);
        dispatch({
            type: ADD_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: ADD_COMPANY_FAILURE,
                payload: error.message
            });
        
    };
};

export const loadFilteredCompanies = ({filters = {}, limit, skip}) => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const data = {
            limit,
            skip,
            filters
        }

        const body = JSON.stringify(data);

        const res = await axios.post(`${API}/companies/by/search`, body, config);
        dispatch({
            type: FILTER_SEARCH_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: FILTER_SEARCH_COMPANY_FAILURE,
            payload: error.message
        });
    } 
};