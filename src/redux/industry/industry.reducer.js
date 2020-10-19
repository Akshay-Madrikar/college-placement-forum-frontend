import {
    LOAD_INDUSTRY_SUCCESS,
    LOAD_INDUSTRY_FAILURE,
    ADD_INDUSTRY_SUCCESS,
    ADD_INDUSTRY_FAILURE,
    DELETE_INDUSTRY_SUCCESS,
    DELETE_INDUSTRY_FAILURE
} from './industry.types';

const INTIAL_STATE = {
    success: false,
    industries: [],
    recent_added_industry: null,
    error: ''
};

const industryReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {

        case ADD_INDUSTRY_SUCCESS:
            return {
                ...state,
                recent_added_industry: action.payload,
                industries: [action.payload,...state.industries],
                success: true
            };

        case ADD_INDUSTRY_FAILURE:
            return {
                ...state,
                error: action.payload.error.message
            };
        
        case LOAD_INDUSTRY_SUCCESS:
            return {
                ...state,
                industries: action.payload,
                success: true
            };
        
        case DELETE_INDUSTRY_SUCCESS:
            return {
                ...state,
                industries: state.industries.filter( industry => 
                        industry._id !== action.payload.industry._id
                    ),
                success: true
            };
        
        case LOAD_INDUSTRY_FAILURE:
        case DELETE_INDUSTRY_FAILURE:
            return {
                ...state,
                error: action.payload.error.message
            };
        
        default:
            return state;
    };
};

export default industryReducer;