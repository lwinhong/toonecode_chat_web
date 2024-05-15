import { v4 as uuidv4 } from "uuid";
import ChatApi2 from "./chat-api2";

// export const chatApi = new ChatApi({});
export const chatUtil = {
    async sendApiRequest(prompt, options, onProgress, onDone, onError) {

        if (this.inProgress) {
            // The AI is still thinking... Do not accept more questions.
            return;
        }
        let { conversationId, abortController, history } = options || {};
        let question = chatUtil.processQuestion(prompt);

        this.inProgress = true;
        if (!abortController)
            abortController = new AbortController();

        this.currentMessageId = uuidv4();
        let err;
        let responseResult = {
            type: 'addResponse', value: "", conversationId, done: false,
            currentMessageId: this.currentMessageId, autoScroll: true, responseInMarkdown: true,
            history: []
        }

        try {
            await chatUtil.sendMessage(question, {
                messageId: conversationId,
                abortSignal: abortController.signal,
                stream: true,
                chatType: "chat",
                history,
                onProgress: (message) => {
                    try {
                        let str = message.text;
                        if (!str)
                            return;
                        responseResult.value = str;
                        onProgress?.(responseResult);
                    } catch (error) {
                        console.error(error);
                        console.log(message.text);
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

        //没有接口，这里也可以发送一下消息过去
        // ****
        this.inProgress = false;
        onError?.(err ?? "没有api");
        responseResult.done = true;
        onDone?.(responseResult);
    },


    async sendMessage(text, opts) {
        const { onProgress, onDone } = opts;
        try {
            const requestMsg = await chatUtil.buildMessages(text, opts);
            const api2 = new ChatApi2(opts);
            await api2.postToServer("", requestMsg, onProgress, onDone)
            return api2.getCallBackResult();
        } catch (e) {
            console.error(e);
        }
    },

    async buildMessages(text, opts) {
        const { chatType = "chat", lang } = opts;
        return {
            lang, chatType,
            "prompt": text,
            stream: true,
            history: opts.history || []
        };
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