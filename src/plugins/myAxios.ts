//阿帕奇axios 全局配置

import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development';
// 创建实例时配置默认值
const myAxios:AxiosInstance = axios.create({

    // 后端接口地址 这里后期需要考虑到根据不同的环境更换url
    baseURL: isDev? 'http://localhost:8080/api' :'http://111.230.9.173',
    // 跨域请求时发送cookie
    withCredentials: true
});


myAxios.defaults.withCredentials = true;



// 添加请求拦截器
myAxios.interceptors.request.use( function (config) {
    // 在发送请求之前做些什么
    console.log('我要发请求啦',config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    console.log('我收到你的相应啦',response)
    //全局响应拦截未登录就跳转到登录页面
    if (response?.data?.code === 40100){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
