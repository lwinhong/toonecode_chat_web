import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import mitt from 'mitt'
const $bus = new mitt()

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

/*********** axios ************* */

import axios from "axios";

axios.defaults.timeout = 40 * 1000;//40s
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api1';

/************************ */

const app = createApp(App)
app.use(createPinia())
app.use(router)
//app.use(ElementPlus)
app.provide("$bus", $bus)
app.config.globalProperties.$bus = $bus
app.mount('#app')

window.exportVar = function (data) {
    $bus.emit('executeCmd', data)
}
//变更代码主题
window.changeTheme = (val) => {
    if (!val) {
        document.documentElement.setAttribute('theme', 'light')
        document.getElementsByTagName('html')[0].dataset.codeTheme = 'light';
    } else {
        document.documentElement.removeAttribute('theme')
        document.getElementsByTagName('html')[0].dataset.codeTheme = 'dark';
    }
}
window.changeTheme(true);