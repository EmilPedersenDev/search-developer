import axios from 'axios';
import { LOGOUT } from '../store/actions/authentication-actions';
import store from '../store/index';

let axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.state.authentication.token;
    if (token) {
      config.headers['Authentication'] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    store.dispatch(LOGOUT);
    return Promise.reject(err);
  }
);

export default axiosInstance;
