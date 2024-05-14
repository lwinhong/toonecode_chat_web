import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import mitt from 'mitt'
const $bus = new mitt()
/*********** axios ************* */

import axios from "axios";

axios.defaults.timeout = 30 * 1000;//30s
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api'; //'http://codeserver.t.vtoone.com'
axios.interceptors.response.use(
    config => {
        //debugger
        //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers["access-control-allow-origin"] = "http://codeserver.t.vtoone.com";
        return config;
    }
);
/************************ */

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.provide("$bus", $bus)
app.config.globalProperties.$bus = $bus
app.mount('#app')

window.exportVar = function (data) {
    $bus.emit('executeCmd', data)
}