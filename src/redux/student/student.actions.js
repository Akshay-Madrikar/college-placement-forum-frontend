import axios from 'axios';

import { API } from '../../config';

import {
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_FAILURE,
  BLOCK_STATUS_SUCCESS, 
  BLOCK_STATUS_FAILURE
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