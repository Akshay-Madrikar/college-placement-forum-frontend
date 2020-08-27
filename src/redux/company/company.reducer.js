import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    FILTER_SEARCH_COMPANY_SUCCESS,
    FILTER_SEARCH_COMPANY_FAILURE
} from './company.types';

const INTIAL_STATE = {
    success: false,
    companies: [],
    filtered_companies: [],
    count: 0,
    recent_added_company: null,
    error: ''
};

const companyReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {

        case ADD_COMPANY_SUCCESS:
            return {
                ...state,
                recent_added_company: action.payload,
                companies: [action.payload,...state.companies],
                success: true
            };

        case ADD_COMPANY_FAILURE:
        case FILTER_SEARCH_COMPANY_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        case FILTER_SEARCH_COMPANY_SUCCESS:
            return {
                ...state,
                count: action.payload.size,
                filtered_companies: action.payload.companiesBySearch
            };
        
        default:
            return state;
    };
};

export default companyReducer;