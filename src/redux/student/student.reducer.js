import {
   LOAD_STUDENTS_SUCCESS,
   LOAD_STUDENTS_FAILURE, 
   BLOCK_STATUS_FAILURE, 
   BLOCK_STATUS_SUCCESS
} from './student.types';

const INTIAL_STATE = {
    students: [],
    current_user_in_view: null,
    success: false,
    error: ''
};

const authReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {

        case LOAD_STUDENTS_SUCCESS: 
            return {
                ...state,
                students: action.payload,
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


        case LOAD_STUDENTS_FAILURE:
        case BLOCK_STATUS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        
        default:
            return state;
    };
};

export default authReducer;