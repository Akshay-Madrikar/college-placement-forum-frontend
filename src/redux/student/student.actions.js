import axios from 'axios';

import { API } from '../../config';

import {
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_FAILURE,
  BLOCK_STATUS_SUCCESS, 
  BLOCK_STATUS_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from './student.types';

export const loadStudents = () => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/students/all`, config);

        dispatch({
            type: LOAD_STUDENTS_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: LOAD_STUDENTS_FAILURE,
            payload: error.message
        });
    } 
};

export const getProfile = ({ studentId }) => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/student/${studentId}`, config);

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: GET_PROFILE_FAILURE,
            payload: error.message
        });
    } 
};

export const updateProfile = ({formData, imageData, studentId}) => async (dispatch) => {
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
        const res = await axios.put(`${API}/student/update/${studentId}`, body, config);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: UPDATE_PROFILE_FAILURE,
                payload: error.message
            });
        
    };
};

export const blockStudent = ({ studentId, adminId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ 
        studentId
    });

    try {
        const res = await axios.put(`${API}/block/student/${studentId}/${adminId}`,body, config);
        dispatch({
            type: BLOCK_STATUS_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: BLOCK_STATUS_FAILURE,
                payload: error.message
            });
        
    };
};

export const UnblockStudent = ({ studentId, adminId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ 
        studentId
    });

    try {
        const res = await axios.put(`${API}/unblock/student/${studentId}/${adminId}`,body, config);
        dispatch({
            type: BLOCK_STATUS_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: BLOCK_STATUS_FAILURE,
                payload: error.message
            });
        
    };
};