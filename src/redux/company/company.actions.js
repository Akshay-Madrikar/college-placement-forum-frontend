import axios from 'axios';

import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
} from './company.types';
import { API } from '../../config';

export const createCompany = ({formData, imageData, id}) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };


    // console.log(JSON.stringify(formData));

    // const pic = JSON.stringify({
    //     picData: {
    //         cloudinary_url: imageData.url,
    //         cloudinary_id: imageData.cloudinary_id
    //     } 
    // })
    
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
            console.log(error.response)
            dispatch({
                type: ADD_COMPANY_FAILURE,
                payload: error.message
            });
        
    };
};