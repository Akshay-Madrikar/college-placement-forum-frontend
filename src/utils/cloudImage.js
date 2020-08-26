import axios from 'axios';

import { API } from '../config';

export const getImageUrl = async( data ) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    
    const body = data

    try {
        const res = await axios.post(`${API}/upload`, body, config);
        return res.data.result

    } catch(error) {
            console.log(error.response)
    };
};