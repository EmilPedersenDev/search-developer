import axios from 'axios';
import { LOGOUT, SET_LOGOUT_CONFIRM_MODAL } from '../store/actions/authentication-actions';
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
    if (err.response.status === 403) {
      return new Promise((res, rej) => {
        store.dispatch(LOGOUT).then(() => {
          store.commit(SET_LOGOUT_CONFIRM_MODAL, true);
          rej(err);
        });
      });
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
