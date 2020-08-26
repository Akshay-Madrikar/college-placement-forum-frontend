// import axios from 'axios';

// import {
//     LOAD_IMAGE_SUCCESS,
//     LOAD_IMAGE_FAILURE
// } from './cloud-image.types';
// import { API } from '../../config';

// export const getImageUrl = ({ data }) => async (dispatch) => {
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     };
    
//     const body = data

//     try {
//         const res = await axios.post(`${API}/upload`, body, config);
//         dispatch({
//             type: LOAD_IMAGE_SUCCESS,
//             payload: res.data.result
//         });

//     } catch(error) {
//             console.log(error.response)
//             dispatch({
//                 type: LOAD_IMAGE_FAILURE,
//                 payload: error.response.data
//             });
        
//     };
// };