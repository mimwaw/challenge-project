import axios from "axios";

const api = axios.create({
    baseURL: "https://conduit.productionready.io/api",
    headers: { "Content-Type": "application/json; charset=utf-8" }
});

// Add a request interceptor
api.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem("user-token");
        if (token) {
          config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default api;
