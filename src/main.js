
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

let vscode;
try {
    if (window.acquireVsCodeApi()) {
        vscode = window.acquireVsCodeApi();
        window.vscodeInstance = vscode;
    }
} catch (error) {
    console.log("不在vscode内")
}


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
