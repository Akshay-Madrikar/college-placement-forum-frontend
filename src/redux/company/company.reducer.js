import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE
} from './company.types';

const INTIAL_STATE = {
    success: false,
    companies: [],
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
            return {
                ...state,
                error: action.payload
            };
        
        default:
            return state;
    };
};

export default companyReducer;