/* eslint-disable no-console */
import axios from 'axios'
import store from '../store'
import { authLogout } from '../modules/Auth/store/actions'

import config from '../config'

const API_URL = config.apiUrl;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch(authLogout())
        }
        return Promise.reject(error);
    });

export default axios
