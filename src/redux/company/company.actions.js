import axios from 'axios';
import queryString from 'query-string';

import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    FILTER_SEARCH_COMPANY_SUCCESS,
    FILTER_SEARCH_COMPANY_FAILURE,
    LOAD_SEARCH_COMPANY_SUCCESS,
    LOAD_SEARCH_COMPANY_FAILURE,
    LOAD_COMPANY_BY_ARRIVAL_SUCCESS,
    LOAD_COMPANY_BY_ARRIVAL_FAILURE,
    LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_SUCCESS,
    LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_FAILURE,
    LOAD_COMPANY_BY_OPENINGS_SUCCESS,
    LOAD_COMPANY_BY_OPENINGS_FAILURE,
    SEARCH_COMPANY_SUCCESS,
    SEARCH_COMPANY_FAILURE,
    LOAD_SINGLE_COMPANY_SUCCESS,
    LOAD_SINGLE_COMPANY_FAILURE,
    LOAD_ALL_COMPANIES_SUCCESS,
    LOAD_ALL_COMPANIES_FAILURE, 
    ADD_QUESTION_SUCCESS, 
    ADD_QUESTION_FAILURE, UPDATE_COMPANY_SUCCESS, UPDATE_COMPANY_FAILURE, DELETE_COMPANY_SUCCESS, DELETE_COMPANY_FAILURE
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

export const updateCompany = ({formData, imageData, id, companyId}) => async (dispatch) => {
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
        const res = await axios.put(`${API}/company/${companyId}/${id}`, body, config);
        dispatch({
            type: UPDATE_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: UPDATE_COMPANY_FAILURE,
                payload: error.message
            });
        
    };
};

export const deleteCompany = ({ companyId, studentId }) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${API}/company/${companyId}/${studentId}`, config);
        dispatch({
            type: DELETE_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: DELETE_COMPANY_FAILURE,
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

export const loadMoreCompanies = ({filters = {}, limit, skip}) => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        let toSkip = skip + limit;

        const data = {
            limit,
            skip: toSkip,
            filters
        }

        const body = JSON.stringify(data);

        const res = await axios.post(`${API}/companies/by/search`, body, config);
        dispatch({
            type: LOAD_SEARCH_COMPANY_SUCCESS,
            payload: res.data
        });

        return toSkip;

    } catch(error) {
        dispatch({
            type: LOAD_SEARCH_COMPANY_FAILURE,
            payload: error.message
        });
    } 
};

export const loadCompaniesByArrivals = () => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/companies?sortBy=createdAt&order=desc&limit=6`, config);

        dispatch({
            type: LOAD_COMPANY_BY_ARRIVAL_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: LOAD_COMPANY_BY_ARRIVAL_FAILURE,
            payload: error.message
        });
    } 
};

export const loadCompaniesByMostPlacedStudents = () => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/companies?sortBy=count_of_placed_students&order=desc&limit=6`, config);

        dispatch({
            type: LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_FAILURE,
            payload: error.message
        });
    } 
};

export const loadCompaniesByOpenings = () => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/companies?sortBy=openings&order=desc&limit=6`, config);

        dispatch({
            type: LOAD_COMPANY_BY_OPENINGS_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: LOAD_COMPANY_BY_OPENINGS_FAILURE,
            payload: error.message
        });
    } 
};

export const loadSearchCompanies = ({ params }) => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        console.log(params);

        const query = queryString.stringify(params);

        const res = await axios.get(`${API}/companies/search?${query}`, config);

        dispatch({
            type: SEARCH_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: SEARCH_COMPANY_FAILURE,
            payload: error.message
        });
    } 
};

export const loadSingleCompany = ({ companyId }) => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/company/${companyId}`, config);

        dispatch({
            type: LOAD_SINGLE_COMPANY_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: LOAD_SINGLE_COMPANY_FAILURE,
            payload: error.message
        });
    } 
};

export const loadCompanies = () => async(dispatch) =>{
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const res = await axios.get(`${API}/companies/all`, config);

        dispatch({
            type: LOAD_ALL_COMPANIES_SUCCESS,
            payload: res.data
        });

    } catch(error) {
        dispatch({
            type: LOAD_ALL_COMPANIES_FAILURE,
            payload: error.message
        });
    } 
};

export const addQuestion = ({formData, companyId, studentId}) => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ 
                text: formData.body
    });

    try {
        const res = await axios.put(`${API}/company/${companyId}/question/create/${studentId}`, body, config);
        dispatch({
            type: ADD_QUESTION_SUCCESS,
            payload: res.data
        });

    } catch(error) {
            dispatch({
                type: ADD_QUESTION_FAILURE,
                payload: error.message
            });
        
    };
};