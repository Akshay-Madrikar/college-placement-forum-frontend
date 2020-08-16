import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
        axios.defaults.headers.common = {
            "Authorization": "Bearer " +JSON.parse(token)
        }
    } else {
        delete axios.defaults.headers.common;
    }
};

export default setAuthToken;