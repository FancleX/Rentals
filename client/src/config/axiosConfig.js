import axios from 'axios';

axios.defaults.timeout = 1000;
axios.defaults.baseURL = process.env.REACT_APP_REQUEST_BASE_URL;
axios.defaults.headers.common['x-access-token'] = localStorage.token || '';

// axios.interceptors.request.use((config) => {
//     // get token from web storage
//     console.log(localStorage.token)
//     if (localStorage.token) {
//         console.log(1)
//         config.headers.common['x-access-token'] = localStorage.token;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

axios.interceptors.response.use((response) => {
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response);
},  (error) => {
    // response error
    const { response } = error;
    if (response) {
        return Promise.reject(response.data);
    } else {
        alert('Server busy or Internet traffic');
    }
});

