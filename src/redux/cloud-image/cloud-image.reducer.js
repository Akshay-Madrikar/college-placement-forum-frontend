// import {
//     LOAD_IMAGE_SUCCESS,
//     LOAD_IMAGE_FAILURE
// } from './cloud-image.types';

// const INTIAL_STATE = {
//     success: false,
//     url: '',
//     id: '',
//     error: ''
// };

// const cloudImageReducer = ( state = INTIAL_STATE, action ) => {
//     switch(action.type) {

//         case LOAD_IMAGE_SUCCESS:
//             return {
//                 ...state,
//                 url: action.payload.secure_url,
//                 id: action.payload.public_id,
//                 success: true
//             };

//         case LOAD_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload.error
//             };
        
//         default:
//             return state;
//     };
// };

// export default cloudImageReducer;