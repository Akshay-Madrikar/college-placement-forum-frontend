import axios from 'axios';

import {
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    UPDATE_LIKES_SUCCESS,
    UPDATE_LIKES_FAILURE,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
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

export const loadSinglePost = ({ postId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };
        
    try {
        const res = await axios.get(`${API}/post/${postId}`,config);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: GET_POST_FAILURE,
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

    console.log(formData, imageData)
    
    const body = JSON.stringify({ 
                    text: formData.body, 
                    pic: {
                        cloudinary_url: imageData.url,
                        cloudinary_id: imageData.cloudinary_id 
                    } 
    });

    try {
        const res = await axios.post(`${API}/post/create/${id}`, body, config);
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

export const addLike = ({ postId, studentId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`${API}/like/${postId}/${studentId}`, config);
        console.log(res.data)
        dispatch({
            type: UPDATE_LIKES_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: UPDATE_LIKES_FAILURE,
                payload: error.message
            });
        
    };
};

export const removeLike = ({ postId, studentId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`${API}/unlike/${postId}/${studentId}`, config);
        dispatch({
            type: UPDATE_LIKES_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: UPDATE_LIKES_FAILURE,
                payload: error.message
            });
        
    };
};

export const deletePost = ({ postId, studentId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${API}/post/${postId}/${studentId}`, config);
        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: DELETE_POST_FAILURE,
                payload: error.message
            });
        
    };
};