import { createVNode, render } from 'vue'
import message from './vue-amazing-ui/messages/install'


export default {
    install(app) {
        message.install(app)

    }
}