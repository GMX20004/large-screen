import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import axios from 'axios';
import dataV from '@jiaminghi/data-view';
import * as echarts from 'echarts';
import vue3SeamlessScroll from 'vue3-seamless-scroll';
import '@/assets/font/log.css';
axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'http://101.43.88.137:9081';
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(res => {
    return res.data
})
const app = createApp(App);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$echarts = echarts;
app.use(vue3SeamlessScroll);
app.use(dataV);
app.use(store);
app.use(router);
app.mount("#app");
