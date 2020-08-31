import axios from 'axios';
import queryString from 'query-string'

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
    SEARCH_COMPANY_FAILURE
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

