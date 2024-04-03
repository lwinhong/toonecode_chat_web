import ChatApi from "../util/chat-api.js"
export const chatApi = new ChatApi({});
export const chatUtil = {
    async sendApiRequest(prompt, options, onProgress, onDone, onError) {

        if (this.inProgress) {
            // The AI is still thinking... Do not accept more questions.
            return;
        }
        let { questionId } = options || {};
        this.questionCounter++;
        const responseInMarkdown = true;

        this.response = '';
        let question = chatUtil.processQuestion(prompt);

        this.inProgress = true;
        this.abortController = new AbortController();

        this.currentMessageId = chatUtil.getRandomId();
        let err;
        if (chatApi) {
            try {
                const chatResponse = await chatApi.sendMessage(question, {
                    systemMessage: this.systemContext,
                    messageId: this.conversationId,
                    parentMessageId: this.messageId,
                    abortSignal: this.abortController.signal,
                    stream: true,
                    chatType: "chat",
                    onProgress: (message) => {
                        this.response = message.text;
                        onProgress?.({
                            type: 'addResponse', value: this.response, messageId: questionId,
                            id: this.conversationId, autoScroll: true, responseInMarkdown
                        });
                    },
                    onDone: (message) => {
                        this.response = message.text;
                        onDone?.({
                            type: 'addResponse', value: this.response, done: true,
                            id: this.conversationId, messageId: questionId, autoScroll: true, responseInMarkdown
                        });
                        this.inProgress = false;
                    }
                });
                ({ text: this.response, id: this.conversationId, parentMessageId: this.messageId } = chatResponse);

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
        onDone?.({ type: 'addResponse', value: this.response, done: true, id: this.conversationId, autoScroll: this.autoScroll, responseInMarkdown });
    },
    processQuestion(question, code, language) {
        if (code) {
            // Add prompt prefix to the code if there was a code block selected
            // question = `${question}${language ? ` (The following code is in ${language} programming language)` : ''}: ${code}`;
            question = `${question}${language ? ` (当前编程语言是${language})` : ''}: ${code}`;
        }
        return question + "\r\n";
    },
    getRandomId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}