import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import mitt from 'mitt'
const $bus = new mitt()

//import './styles/element/index.scss'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
//import ElementPlus from 'element-plus'


/*********** axios ************* */

// import axios from "axios";

// axios.defaults.timeout = 40 * 1000;//40s
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api1';

/************************ */
import plugins from './plugins/index.js';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import './plugins/vue3-context-menu/myContextMenu.scss'
import ContextMenu from '@imengyu/vue3-context-menu'

const pinia = createPinia();
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ContextMenu)
app.use(plugins)
// app.use(ElementPlus)
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