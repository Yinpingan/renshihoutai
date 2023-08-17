import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import router from "@/router";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    if(response.data instanceof Blob) return response.data
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({ type: 'error', message })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    console.dir(error)
    if (error.response.status == '401') {
      Message({ type: "warning", message: 'token失效了' })
      store.dispatch('user/logout')
      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default service;
