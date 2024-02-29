// axios.js
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const instance = axios.create({
    baseURL: "http://209.97.184.237:4000/api",
    //timeout: 5000, Set a timeout for requests (optional)
    headers: {
        'Content-Type': 'application/json',
        'Credentials' : 'include'
    },
});


// Add an interceptor to inject the Authorization header before each request
instance.interceptors.request.use(
    (config) => {
        // Get the user token from the store
        // const userToken = "defe";
        const userToken = localStorage.getItem("access-token") || null;

        // If a token is available, add it to the Authorization header
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;
