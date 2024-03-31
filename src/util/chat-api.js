import axios from "axios";
import { v4 as uuidv4 } from "uuid";

let _historyCount = 3;
const HUMAN_ROLE_START_TAG = "<s>human\n";
const BOT_ROLE_START_TAG = "<s>bot\n";
// const ENDOFTEXT = "<|endoftext|>";

export default class ChatApi {

    constructor(opt) {
        const { apiBaseUrl } = opt;
        this._cacheChatMessage = new Array();
        axios.defaults.withCredentials = true;
        axios.defaults.baseURL = apiBaseUrl ?? 'http://codeserver.t.vtoone.com';
        axios.defaults.headers["Content-Type"] = "application/json";
        this._cacheChatMessage = [];
    }

    async sendMessage(text, opts) {
        const {
            stream,
            onProgress,
            onDone,
            //conversationId = uuidv4(),
            //parentMessageId,
            messageId = uuidv4(),
            timeoutMs = 40 * 1000,
            //chatType = "chat",
            historyCount = 3,
            cacheHistory = true
        } = opts;
        this._historyCount = historyCount;
        let { abortSignal } = opts;
        let abortController = null;
        if (timeoutMs && !abortSignal) {
            abortController = new AbortController();
            abortSignal = abortController.signal;
        }
        const message = {
            role: "user",
            id: messageId,
            parentMessageId: messageId,
            text
        };
        const result = {
            role: "assistant",
            id: uuidv4(),
            parentMessageId: messageId,
            text: "",
            error: ""
        };

        let config = {
            method: 'post',
            url: '/chat',
            timeout: timeoutMs,
            signal: abortSignal,
        };
        if (stream) {
            config.responseType = "stream";
            config.url += "_stream_v1";

            cacheHistory && await this._updateMessages(message);

            const requestMsg = await this.buildMessages(text, opts);
            await this.doRequestPost(config, requestMsg).then((response) => {
                if (onProgress) {
                    response.data.on('data', (chunk) => {
                        // 处理流数据的逻辑
                        result.text = chunk.toString();
                        onProgress == null ? void 0 : onProgress(result);
                    });
                }
                if (onDone) {
                    response.data.on('end', async () => {
                        // 数据接收完成的逻辑
                        let rs = onDone == null ? void 0 : onDone(result);
                        if (rs === false) { return; }
                        cacheHistory && await this._updateMessages(result);
                    });
                }
                response.data.on('error', (error) => {
                    if (axios.isCancel(error)) {
                        console.log('请求被取消', error.message);
                    } else {
                        console.log('请求出错', error.message);
                    }
                    result.error = "服务异常，请稍后再试 " + error;
                    onDone == null ? void 0 : onDone(result);
                });
            }).catch(err => {
                result.error = "服务异常，请稍后再试. " + err;
                onDone == null ? void 0 : onDone(result);
            });
        }
        else {
            const response = await this.doRequestPost(config, {});
            result.text = response.data;
            onDone == null ? void 0 : onDone(result);
        }
        return result;
    }

    async buildMessages(text, opts) {
        const { chatType = "chat", lang } = opts;

        if (chatType === "chat") {
            text = this.combineMessageWithTAG(text);
        }
        return { lang, chatType, "prompt": text, };
    }
    combineMessageWithTAG(text) {
        /**下面这拼接，可以根据历史上下文来不断地回答问题 */
        /*
            <s>system
            这是System指令
            <s>human
            这是第1轮用户输入的问题
            <s>bot
            这是第1轮模型生成的内容<|endoftext|>
            <s>human
            这是第2轮用户输入的问题
            <s>bot
            这是第2轮模型生成的内容<|endoftext|>
            ...
            <s>human
            这是第n轮用户输入的问题
            <s>bot
            {模型现在要生成的内容}<|endoftext|>
        */
        // if (this._cacheChatMessage?.length > 0) {
        //     let prompt = "";
        //     this._cacheChatMessage.forEach((item, index) => {
        //         if (item.userMessage?.text) {
        //             prompt += `${this.HUMAN_ROLE_START_TAG}${item.userMessage?.text}`;
        //         }
        //         if (item.assistantMessage?.text) {
        //             prompt += `${this.BOT_ROLE_START_TAG}${item.assistantMessage?.text}${this.ENDOFTEXT}\n`;
        //         }
        //     });
        //     if (prompt) {
        //         text = prompt;
        //     }
        // } else {
        //     text = `${this.HUMAN_ROLE_START_TAG}${text}`;
        // }
        //text = `${text}\n${this.BOT_ROLE_START_TAG}`;
        text = `${HUMAN_ROLE_START_TAG}${text}\n${BOT_ROLE_START_TAG}`;
        return text;
    }
    async _updateMessages(message) {
        return new Promise((resolve, reject) => {
            if (!this._cacheChatMessage) {
                return resolve(void 0);
            }
            try {
                if (message.role === 'user') {
                    //超出指定范围，需要清理掉一下
                    if (this._cacheChatMessage.length >= _historyCount) {
                        while (this._cacheChatMessage.length >= _historyCount) {
                            this._cacheChatMessage.splice(0, 1);
                        }
                    }
                    this._cacheChatMessage.push({
                        messageId: message.id,
                        userMessage: message
                    });
                }
                else {
                    let exist = this._cacheChatMessage.find(f => f.messageId === message.parentMessageId);
                    if (exist) {
                        exist.assistantMessage = message;
                    }
                }
                resolve(message);
            } catch (err) {
                reject(err);
            }
        }).catch(err => {
            console.error(err);
        });
    }
    async clearCacheMessage() {
        this._cacheChatMessage = undefined;
    }
    doRequestPost(config, data) {
        return axios.post(config.url || "", data, config);
    }
}
