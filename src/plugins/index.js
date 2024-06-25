import { createVNode, render } from 'vue'
// import message from './vue-amazing-ui/message/Message.vue'


export default {
    install(app) {
        // // 将组件转换为虚拟DOM
        // const Vnode = createVNode(message)
        // // 将虚拟DOM挂载到页面节点上
        // render(Vnode, document.body)
        // const exposed = Vnode.component?.exposed
        // app.config.globalProperties.$toast = exposed
        // app.provide("$toast", exposed)
    }
}