import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    UPDATE_LIKES_SUCCESS,
    UPDATE_LIKES_FAILURE,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
} from './post.types';

const INTIAL_STATE = {
    success: false,
    posts: [],
    current_post_in_view: {},
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

        case UPDATE_LIKES_SUCCESS:
            return {
                ...state,
                posts: state.posts.map( post => 
                        post._id === action.payload._id 
                        ? { ...post, likes: action.payload.likes } 
                        : post
                    ),
                success: true
            };

        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter( post => 
                        post._id !== action.payload.post._id
                    ),
                success: true
            };
        
        case GET_POST_SUCCESS:
            return {
                ...state,
                current_post_in_view: action.payload.post,
                success: true
            };
        
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                current_post_in_view: { 
                    ...state.current_post_in_view, 
                    comments: action.payload.comments
                },
                success: true
            };
        
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,    
                current_post_in_view: {
                    ...state.current_post_in_view,
                    comments: action.payload.comments
                },     
                success: true
            };
        
        case ADD_POST_FAILURE:
        case LOAD_POSTS_FAILURE:
        case UPDATE_LIKES_FAILURE:
        case DELETE_POST_FAILURE:
        case GET_POST_FAILURE:
        case ADD_COMMENT_FAILURE:
        case DELETE_COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        
        default:
            return state;
    };
};

export default postReducer;