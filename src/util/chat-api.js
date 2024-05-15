import ChatApi2 from "./chat-api2";

export default class ChatApi {

    async sendMessage(text, opts) {
        const { onProgress, onDone } = opts;
        try {
            const requestMsg = await this.buildMessages(text, opts);
            const api2 = new ChatApi2(opts);
            await api2.postToServer("", requestMsg, onProgress, onDone)
            return api2.getCallBackResult();
        } catch (e) {
            console.error(e);
        }
    }

    async buildMessages(text, opts) {
        const { chatType = "chat", lang } = opts;
        return {
            lang, chatType,
            "prompt": text,
            stream: true,
            history: opts.history || []
        };
    }
}
