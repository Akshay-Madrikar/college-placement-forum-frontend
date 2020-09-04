import axios from 'axios';

import {
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE
} from './post.types';
import { API } from '../../config';


export const loadPosts = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    
    try {
        const res = await axios.get(`${API}/posts`,config);
        dispatch({
            type: LOAD_POSTS_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: LOAD_POSTS_FAILURE,
                payload: error.message
            });
        
    };
};

export const createPost = ({formData, imageData, id}) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };
    
    const data = JSON.stringify({ 
                    body: formData, 
                    pic: {
                        cloudinary_url: imageData.url,
                        cloudinary_id: imageData.cloudinary_id 
                    } 
    });

    try {
        const res = await axios.post(`${API}/post/create/${id}`, data, config);
        dispatch({
            type: ADD_POST_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: ADD_POST_FAILURE,
                payload: error.message
            });
        
    };
};