<script>
import ChatView from '@/components/chat/ChatViewEl.vue';
import { useStore } from '@/stores/useStore';

export default {
    extends: ChatView,
    setup(props, ctx) {
        return {
            ...ChatView.setup(props, ctx),
        }
    },
    methods: {
        messageHandler(event) {
            const message = event.data;
            switch (message.type) {
                case "showInProgress":
                    this.showInProgress(message);
                    break;
                case "addResponse":
                    this.addResponse(message);
                    break;
                case "addQuestion":
                    this.addQuestion(message);
                    break;
                case "loginSuccessful":
                    break;
                case "addError":
                    this.addError(message)
                    break;
                case "clearConversation":
                    this.onClearClick();
                    break;
                case "exportConversation":
                    this.onExportConversation();
                    break;
                case "textSelectionChanged":
                    // const input = document.getElementById("question-input");
                    // input.value = message.text;
                    break;
                case "chat_code":
                case "ask":
                    message.cmd = message.type;
                    this.busEventHandler(message);
                    break;
                default:
                    message.cmd = message.type;
                    this.busEventHandler(message);
                    break;
            }
        }
    },

    mounted() {

        console.log("vscode view mounted")
        try {
            if (!window.vscodeInstance) {
                const vscode = window.acquireVsCodeApi();
                window.vscodeInstance = vscode;
                useStore().setVsCodeMode(vscode ? true : false);
            }
        } catch (error) {
            console.log("不在vscode内:" + error)
        }
        window.removeEventListener("message", this.messageHandler);
        window.addEventListener("message", this.messageHandler);
    }
}
</script>