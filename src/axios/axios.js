import axios from "axios";

const instance = axios.create({
    baseURL: "https://autozone.onepay.am/api/v1",
});

instance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    config.params = {...config.params}
    return config;
});

export default instance;