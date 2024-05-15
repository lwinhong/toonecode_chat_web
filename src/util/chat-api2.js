import { createParser } from 'eventsource-parser'
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// 聊天接口
export const ONLINE_CHAT_APIKEY = "app-jWmI0bA3AioiorQq6bmU73Ik"
export const ONLINE_CHAT_API = "http://ai.t.vtoone.com/api/v1/chat-messages"
// 代码接口
export const ONLINE_CODE_APIKEY = "app-HZSqJWyZI6xjqkbyXUIcLErR"
export const ONLINE_CODE_API = "http://ai.t.vtoone.com/api/v1/completion-messages"

export default class ChatApi2 {

    constructor(options) {
        let { abortSignal, timeoutMs = 40 * 1000, chatType = "chat" } = options;

        let abortController = null;
        if (timeoutMs && !abortSignal) {
            abortController = new AbortController();
            abortSignal = abortController.signal;
        }
        // 创建axios配置
        this.axiosConfig = {
            method: 'post',
            timeout: timeoutMs,
            signal: abortSignal,
            responseType: "stream",
            headers: this.getRequestHeader(chatType === "code"
                ? ONLINE_CODE_APIKEY : ONLINE_CHAT_APIKEY)
        };
        //if (import.meta.env.MODE === 'production')
        this.apiUrl = chatType === "code" ? ONLINE_CODE_API : ONLINE_CHAT_API;
        // else
        //     this.apiUrl = chatType === "code" ? "/completion-messages" : "/chat-messages";
        // 创建调用结果对象
        this.callBackResult = {
            role: "assistant",
            id: uuidv4(),
            text: "",
            error: "",
        };
    }
    getCallBackResult() {
        return this.callBackResult || {}
    }
    async postToServer(url, data, onProgress, onDone) {
        data.requestId = this.callBackResult.id;

        //sse 解析器
        const sseParser = this.createSseParser(onProgress)

        // const handler = (response) => {
        //     if (onProgress) {
        //         response.data.on('data', (chunk) => {
        //             // 处理流数据的逻辑
        //             try {
        //                 chunk = chunk || "";
        //                 sseParser.feed(chunk.toString());
        //             } catch (error) {
        //                 console.error(error);
        //             }
        //         });
        //     }
        //     if (onDone) {
        //         response.data.on('end', async () => {
        //             // 数据接收完成的逻辑
        //             let rs = onDone?.(this.callBackResult);
        //             if (rs === false || this.callBackResult.error) {
        //                 return;
        //             }
        //         });
        //     }
        //     response.data.on('error', (error) => {
        //         if (axios.isCancel(error)) {
        //             console.log('请求被取消', error.message);
        //         } else {
        //             console.log('请求出错', error.message);
        //         }
        //         this.callBackResult.error = "服务异常，请稍后再试 " + error;
        //         onDone?.(this.callBackResult);
        //     });
        // };
        // await axios.post(url || this.apiUrl, this.getRequestData(data), this.axiosConfig).then(handler).catch(err => {
        //     this.callBackResult.error = "服务异常，请稍后再试. " + err;
        //     onDone?.(this.callBackResult);
        // });;

        try {
            let response = await fetch(url || this.apiUrl,
                {
                    body: JSON.stringify(this.getRequestData(data)),
                    ...this.axiosConfig
                });

            if (!response.ok) {
                throw new FatalError("无法连接到服务器");
            }

            const textDecoder = response.body.pipeThrough(new TextDecoderStream()).getReader();
            while (true) {
                const { done, value } = await textDecoder.read();
                if (done) {
                    this.callBackResult.text = "";
                    onDone?.(this.callBackResult);
                    break;
                }
                sseParser.feed(value);
            }
        } catch (error) {
            this.callBackResult.error = "服务异常: " + error.messages;
            console.log(error)
            onDone?.(this.callBackResult);
        }
    }

    createSseParser(onProgress) {
        return createParser((event) => {
            if (event.type === 'event') {
                const answer = this.responseDataParser(event.data);
                if (answer) {
                    this.callBackResult.text = answer;
                    onProgress(this.callBackResult);
                }
            }
        })
    }

    responseDataParser(data) {
        try {
            let { event, answer } = JSON.parse(data);
            if (event === 'message')
                return answer;
        }
        catch (error) {
            console.error(error);
        }
    }

    getRequestHeader(api_key) {
        let headers = {
            'Authorization': `Bearer ${api_key}`,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        }
        return headers;
    }
    getRequestData(originData) {
        let { chatType, lang, prompt, history, prefixCode, suffixCode } = originData
        let query_dict = {
            // "inputs": {},
            // "query": prompt,
            "response_mode": "streaming",
            "conversation_id": "",
            "user": "abc-123"
        }
        if (chatType === "code") {
            //"inputs": {"prefix_code": prefix_code,"suffix_code":suffix_code},
            query_dict.inputs = { "prefix_code": prefixCode, "suffix_code": suffixCode };
        } else if (chatType === "chat") {
            query_dict.inputs = {};

            let messages = [
                { role: "system", content: "You are a helpful assistant." }
            ]

            history && history.forEach(his => {
                his.forEach(item => {
                    messages.push({ role: his["role"], content: his["content"] })
                })
            });

            messages.push({ role: "user", content: prompt })
            query_dict.query = messages;
        }
        return query_dict;
    }
}