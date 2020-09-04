import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE
} from './post.types';

const INTIAL_STATE = {
    success: false,
    posts: [],
    recent_added_post: null,
    error: ''
};

const postReducer = ( state = INTIAL_STATE, action ) => {
    switch(action.type) {

        case ADD_POST_SUCCESS:
            return {
                ...state,
                recent_added_post: action.payload,
                posts: [action.payload.post,...state.posts],
                success: true
            };
        
        case LOAD_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                success: true
            };
        
        case ADD_POST_FAILURE:
        case LOAD_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        
        default:
            return state;
    };
};

export default postReducer;