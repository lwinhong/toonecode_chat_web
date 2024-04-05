import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/*********** axios ************* */

import axios from "axios";

axios.defaults.timeout = 30 * 1000;//30s
axios.defaults.withCredentials = true;
axios.defaults.baseURL ='/api'; //'http://codeserver.t.vtoone.com'
// axios.interceptors.response.use(
//     config => {
//         //debugger
//         config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//         config.headers["access-control-allow-origin"] = "http://codeserver.t.vtoone.com";
//         return config;
//     }
// );
/************************ */

try {
    const vscode = window.acquireVsCodeApi();
    if (vscode) {
        window.vscodeInstance = vscode;
    }
} catch (error) {
    console.log("不在vscode内")
}


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
