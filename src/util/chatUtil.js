// import { v4 as uuidv4 } from "uuid";
import { ChatApi2, StopChatApi, LikeApi } from "./chat-api2";
//import ChatApi from "../util/chat-api-bak.js";
import { FileHandlerCore } from "./file-upload-core";

export const chatUtil = {
    async sendApiRequest(prompt, options, onProgress, onDone, onError) {

        this.abortController?.abort();
        let { qaId, abortController, history, serverConversationId } = options || {};
        let question = chatUtil.processQuestion(prompt);

        if (!abortController)
            this.abortController = abortController = new AbortController();

        let err;
        let responseResult = {
            type: 'addResponse', value: "", qaId, done: false,
            autoScroll: true, responseInMarkdown: true,
        }

        try {
            const callBackHandler = (callback, message, done) => {
                try {
                    responseResult.serverMessage = message;
                    responseResult.value = message.text;
                    responseResult.done = done;
                    responseResult.error = message.error;
                    callback?.(responseResult);
                } catch (error) {
                    console.error(error);
                    console.log(message.text);
                }
            }
            await chatUtil.sendMessage(question, {
                messageId: qaId,
                serverConversationId,
                abortController,
                abortSignal: abortController?.signal,
                stream: true,
                chatType: "chat",
                history,
                onProgress: (message) => callBackHandler(onProgress, message, false),
                onDone: (message) => callBackHandler(onProgress, message, true)
            });
            return;
        } catch (error) {
            err = error;
            //出错了干点什么
            console.error(error);
        }

        this.abortController = null;
        //没有接口，这里也可以发送一下消息过去
        // ****
        //this.inProgress = false;
        onError?.(err ?? "没有api");
        responseResult.done = true;
        responseResult.error = err;
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
            lang, chatType, "prompt": text, stream: true,
            serverConversationId: opts.serverConversationId,
            history: opts.history || []
        };
    },

    buildHistories(viewHistories) {
        let histories = [];
        if (!viewHistories || viewHistories.length === 0)
            return histories;

        let tempHistories = [];
        const historyCount = 3;
        if (viewHistories.length > historyCount) {
            for (let i = viewHistories.length - historyCount; i < viewHistories.length; i++) {
                tempHistories.push(viewHistories[i])
            }
        } else {
            tempHistories = viewHistories;
        }

        tempHistories.forEach(item => {
            histories.push({
                role: "user",
                content: item.originQuestion
            }, {
                role: "assistant",
                content: item.originAnswer
            })
        })

        return histories;
    },

    processQuestion(question, code, language) {
        if (code) {
            // Add prompt prefix to the code if there was a code block selected
            // question = `${question}${language ? ` (The following code is in ${language} programming language)` : ''}: ${code}`;
            question = `${question}${language ? ` (当前编程语言是${language})` : ''}: ${code}`;
        }
        return question + "\r\n";
    },

    async sendApiRequestLocal(prompt, options, onProgress, onDone, onError) {

        // if (this.inProgress) {
        //     // The AI is still thinking... Do not accept more questions.
        //     return;
        // }
        // let { conversationId, abortController, history } = options || {};
        // let question = chatUtil.processQuestion(prompt);

        // this.inProgress = true;
        // if (!abortController)
        //     abortController = new AbortController();

        // this.currentMessageId = uuidv4();
        // let err;
        // let responseResult = {
        //     type: 'addResponse', value: "", conversationId, done: false,
        //     currentMessageId: this.currentMessageId, autoScroll: true, responseInMarkdown: true,
        //     history: []
        // }

        // try {
        //     const chatApi = new ChatApi({});
        //     await chatApi.sendMessage(question, {
        //         messageId: conversationId,
        //         abortSignal: abortController.signal,
        //         stream: true,
        //         chatType: "chat",
        //         history,
        //         onProgress: (message) => {
        //             try {
        //                 let str = message.text;
        //                 if (!str)
        //                     return;
        //                 responseResult.value = str;
        //                 onProgress?.(responseResult);
        //             } catch (error) {
        //                 console.error(error);
        //                 console.log(message.text);
        //             }
        //         },
        //         onDone: (message) => {
        //             this.inProgress = false;
        //             responseResult.done = true;
        //             onDone?.(responseResult);
        //             this.inProgress = false;
        //         }
        //     });
        //     return;
        // } catch (error) {
        //     err = error;
        //     //出错了干点什么
        // }


        // //没有接口，这里也可以发送一下消息过去
        // // ****
        // this.inProgress = false;
        // onError?.(err ?? "没有api");
        // responseResult.done = true;
        // onDone?.(responseResult);
    },

    stopConversation(options) {
        const { taskId } = options || {};
        if (!taskId)
            return;

        const stop = new StopChatApi(options);
        return stop.stop();
    },
    uploadFile(filePath) {
        return new FileHandlerCore().uploadFile("", filePath);
    },
    likeConversation(options) {
        const { messageId } = options || {};
        if (!messageId)
            return true;

        return new LikeApi(options).like();
    }
}