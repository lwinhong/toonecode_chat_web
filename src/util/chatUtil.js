import ChatApi from "../util/chat-api.js"
import { v4 as uuidv4 } from "uuid";

export const chatApi = new ChatApi({});
export const chatUtil = {
    async sendApiRequest(prompt, options, onProgress, onDone, onError) {

        if (this.inProgress) {
            // The AI is still thinking... Do not accept more questions.
            return;
        }
        let { conversationId, abortController } = options || {};
        let question = chatUtil.processQuestion(prompt);

        this.inProgress = true;
        if (!abortController)
            abortController = new AbortController();

        this.currentMessageId = uuidv4();
        let err;
        let responseResult = {
            type: 'addResponse', value: "", conversationId, done: false,
            currentMessageId: this.currentMessageId, autoScroll: true, responseInMarkdown: true
        }
        if (chatApi) {
            try {
                await chatApi.sendMessage(question, {
                    systemMessage: this.systemContext,
                    messageId: conversationId,
                    abortSignal: abortController.signal,
                    stream: true,
                    chatType: "chat",
                    onProgress: (message) => {
                        try {
                            const { answer } = JSON.parse(message.text);
                            responseResult.value = answer;
                            onProgress?.(responseResult);
                        } catch (error) {
                            console.error(error);
                        }
                    },
                    onDone: (message) => {
                        this.inProgress = false;
                        responseResult.done = true;
                        onDone?.(responseResult);
                        this.inProgress = false;
                    }
                });
                return;
            } catch (error) {
                err = error;
                //出错了干点什么
            }
        }

        //没有接口，这里也可以发送一下消息过去
        // ****
        this.inProgress = false;
        onError?.(err ?? "没有api");
        responseResult.done = true;
        onDone?.(responseResult);
    },
    processQuestion(question, code, language) {
        if (code) {
            // Add prompt prefix to the code if there was a code block selected
            // question = `${question}${language ? ` (The following code is in ${language} programming language)` : ''}: ${code}`;
            question = `${question}${language ? ` (当前编程语言是${language})` : ''}: ${code}`;
        }
        return question + "\r\n";
    }
}