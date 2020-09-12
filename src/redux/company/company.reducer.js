import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    FILTER_SEARCH_COMPANY_SUCCESS,
    FILTER_SEARCH_COMPANY_FAILURE,
    LOAD_SEARCH_COMPANY_SUCCESS,
    LOAD_SEARCH_COMPANY_FAILURE,
    LOAD_COMPANY_BY_ARRIVAL_FAILURE,
    LOAD_COMPANY_BY_ARRIVAL_SUCCESS,
    LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_FAILURE,
    LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_SUCCESS,
    LOAD_COMPANY_BY_OPENINGS_SUCCESS,
    LOAD_COMPANY_BY_OPENINGS_FAILURE,
    SEARCH_COMPANY_SUCCESS,
    SEARCH_COMPANY_FAILURE,
    LOAD_SINGLE_COMPANY_SUCCESS,
    LOAD_SINGLE_COMPANY_FAILURE,
    LOAD_ALL_COMPANIES_SUCCESS,
    LOAD_ALL_COMPANIES_FAILURE, ADD_QUESTION_SUCCESS, ADD_QUESTION_FAILURE
} from './company.types';

const INTIAL_STATE = {
    success: false,
    companies: [],
    filtered_companies: [],
    filtered_count: 0,
    count: 0,
    current_company_in_view: {},
    searched_companies: [],
    companies_by_arrival: [],
    companies_by_most_placed_students: [],
    companies_by_openings: [],
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

        case FILTER_SEARCH_COMPANY_SUCCESS:
            return {
                ...state,
                count: action.payload.size,
                filtered_companies: action.payload.companiesBySearch,
                filtered_count: action.payload.size,
                success: true
            };

        case LOAD_SEARCH_COMPANY_SUCCESS:
            return {
                ...state,
                count: state.count + action.payload.size,
                filtered_companies: [
                    ...state.filtered_companies , 
                    ...action.payload.companiesBySearch
                ],
                filtered_count: action.payload.size,
                success: true
            };

        case LOAD_COMPANY_BY_ARRIVAL_SUCCESS:
            return {
                ...state,
                companies_by_arrival: action.payload.companies,
                success: true
            };

        case LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_SUCCESS:
            return {
                ...state,
                companies_by_most_placed_students: action.payload.companies,
                success: true
            };

        case LOAD_COMPANY_BY_OPENINGS_SUCCESS:
            return {
                ...state,
                companies_by_openings: action.payload.companies,
                success: true
            };

        case SEARCH_COMPANY_SUCCESS:
            return {
                ...state,
                searched_companies: action.payload.companies,
                success: true
            };

        case LOAD_SINGLE_COMPANY_SUCCESS:
            return {
                ...state,
                current_company_in_view: action.payload.company,
                success: true
            };

        case LOAD_ALL_COMPANIES_SUCCESS:
            return {
                ...state,
                companies: action.payload,
                success: true
            };
            
        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                companies: state.companies.map(company =>
                    company._id === action.payload.id 
                     ? { ...company, questions: action.payload.questions }
                     : company
                    ),
                success: true
            };
        
        case ADD_COMPANY_FAILURE:
        case FILTER_SEARCH_COMPANY_FAILURE:
        case LOAD_SEARCH_COMPANY_FAILURE:
        case LOAD_COMPANY_BY_ARRIVAL_FAILURE:
        case LOAD_COMPANY_BY_MOST_PLACED_STUDENTS_FAILURE:
        case LOAD_COMPANY_BY_OPENINGS_FAILURE:
        case SEARCH_COMPANY_FAILURE:
        case LOAD_SINGLE_COMPANY_FAILURE:
        case LOAD_ALL_COMPANIES_FAILURE:
        case ADD_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        
        default:
            return state;
    };
};

export default companyReducer;