import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REQUEST_BASE_URL,
    timeout: 1000
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.auth = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response);
},  (error) => {
    // response error
    console.log(error)
    const { response } = error;
    if (response) {
        return Promise.reject(response.data);
    } else {
        alert('Server busy or Internet traffic');
    }
});

export default axiosInstance;
