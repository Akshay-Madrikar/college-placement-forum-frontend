import {
   LOAD_STUDENTS_SUCCESS,
   LOAD_STUDENTS_FAILURE, 
   BLOCK_STATUS_FAILURE, 
   BLOCK_STATUS_SUCCESS,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_FAILURE,
   GET_PROFILE_SUCCESS,
   GET_PROFILE_FAILURE,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAILURE,
   NEW_PASSWORD_SUCCESS,
   NEW_PASSWORD_FAILURE
} from './student.types';

const INTIAL_STATE = {
    students: [],
    current_user_in_view: null,
    success: false,
    message: '',
    error: ''
};

const studentReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {

        case LOAD_STUDENTS_SUCCESS: 
            return {
                ...state,
                students: action.payload,
                success: true
            };

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                current_user_in_view: action.payload.student,
                success: true
            };

        case UPDATE_PROFILE_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload.student)); 
            return {
                ...state,
                current_user_in_view: action.payload.student,
                success: true
            };

        case BLOCK_STATUS_SUCCESS: 
            return {
                ...state,
                students: state.students.map( student => 
                   ( student._id === action.payload._id 
                    ? { ...student, block_status: action.payload.block_status }
                    : student
                   ) 
                ),
                success: true
            };
        
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.message
            }

        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.message
            }

        case LOAD_STUDENTS_FAILURE:
        case GET_PROFILE_FAILURE:
        case BLOCK_STATUS_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case RESET_PASSWORD_FAILURE:
        case NEW_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        
        default:
            return state;
    };
};

export default studentReducer;