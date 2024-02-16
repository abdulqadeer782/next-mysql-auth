import axios from "axios";

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {

    let token = sessionStorage.getItem('token')

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
