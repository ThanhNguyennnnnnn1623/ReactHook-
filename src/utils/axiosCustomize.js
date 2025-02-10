import axios from "axios";
import NProgress from "nprogress";
import { store } from '../redux/store'
import { refreshToken } from "../Service/apiService";
import { jwtDecode } from "jwt-decode";
import { updateSuccessToken } from "../redux/action/userAction";


NProgress.configure({
    showSpinner: false,
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing: 'ease',
    // speed: 200,
    // trickle:true,
    // trickleRate: 0.02,
    trickleSpeed: 100
})

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});
const renewToken = async (email, refresh_token) => {
    try {
        const data = await refreshToken(email, refresh_token);
        if (data && data.EC === 0) {
            const newToken = data.DT.access_token;
            // Cập nhật Redux với token mới
            store.dispatch(updateSuccessToken(data));
            return newToken;
        }
        return null;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
    }
};
// Add a request interceptor
instance.interceptors.request.use(async (config) => {
    const access_token = store?.getState()?.user?.account?.access_token;
    const email = store?.getState()?.user?.account?.email;
    const refresh_token = store?.getState()?.user?.account?.refresh_token;
    if (access_token) {
        const { exp } = jwtDecode(access_token);
        const expirationTime = exp * 1000 - 60000; // Token hết hạn sau 1 phút
        if (Date.now() >= expirationTime) {
            const newToken = await renewToken(email, refresh_token);
            if (newToken) {
                config.headers['Authorization'] = `Bearer ${newToken}`;
            } else {
                // Chuyển hướng nếu làm mới token thất bại
                window.location.href = '/login';
                return Promise.reject("Token refresh failed");
            }
        } else {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
    }
    NProgress.start();
    return config;
    // Do something before request is sent
}, function (error) {
    NProgress.done();
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();
    // token expired
    if (error.response.data && error.response.data.EC === -999) {
        window.location.href = '/login';
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
        ? error.response.data
        :
        Promise.reject(error);
});

export default instance;
