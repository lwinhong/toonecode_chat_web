import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { fetchEventSource } from './fetchEventSource/index';
import { createParser } from 'eventsource-parser'
import { EventSourceParserStream } from 'eventsource-parser/stream'
//let _historyCount = 3;
// const HUMAN_ROLE_START_TAG = "<s>human\n";
// const BOT_ROLE_START_TAG = "<s>bot\n";
// const ENDOFTEXT = "<|endoftext|>";
class RetriableError extends Error { }
class FatalError extends Error { }

export default class ChatApi {

    constructor(opt) {
        // const { apiBaseUrl } = opt;
        //this._cacheChatMessage = new Array();
        // axios.defaults.withCredentials = true;
        // axios.defaults.baseURL = apiBaseUrl ?? '/api';
        // axios.defaults.headers["Content-Type"] = "application/json";
        //this._cacheChatMessage = [];
    }

    async sendMessage(text, opts) {
        const {
            stream,
            onProgress,
            onDone,
            timeoutMs = 60 * 1000,
            chatType = "chat",
        } = opts;

        let { abortSignal } = opts;
        let abortController = null;
        if (timeoutMs && !abortSignal) {
            abortController = new AbortController();
            abortSignal = abortController.signal;
        }

        const result = {
            role: "assistant",
            id: uuidv4(),
            text: "",
            error: ""
        };
        let url = '/chat';
        if (chatType === "code") {
            url = '/code_generate';
        }
        let config = {
            method: 'post',
            url,
            timeout: timeoutMs,
            signal: abortSignal,
        };
        if (stream) {
            config.responseType = "stream";
            const requestMsg = await this.buildMessages(text, opts);
            requestMsg.requestId = result.id;

            config.data = requestMsg;
            let url = "http://codeserver.t.vtoone.com/v1" + config.url
            // if (import.meta.env.MODE === 'production') {
            //     url = import.meta.env.VITE_API_BASE_URL + config.url; //
            // }
            //await this.postByFetchEventSource(url, config, requestMsg, onProgress, onDone, result);
            await this.postByFetch(url, config, requestMsg, onProgress, onDone, result);
        }
        else {
            const response = await this.doRequestPost(config, {});
            result.text = response.data;
            onDone?.(result);
        }
        return result;
    }

    async postByFetchEventSource(url, config, requestMsg, onProgress, onDone, result) {

        await fetchEventSource(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestMsg),
            signal: config.signal,
            openWhenHidden: true,
            async onopen(response) {
                if (response.ok) {
                    return; // everything's good
                } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                    // client-side errors are usually non-retriable:
                    throw new FatalError();
                } else {
                    //throw new RetriableError();
                }
            },
            onmessage(msg) {
                // if the server emits an error message, throw an exception
                // so it gets handled by the onerror callback below:
                if (msg.event === 'error') {
                    throw new FatalError(msg.data);
                } else if (msg.event === 'data') {
                    result.text = msg.data;
                    onProgress(result);
                } else if (msg.event === 'done') {
                    onDone?.(result);
                }
            },
            onclose() {
                // if the server closes the connection unexpectedly, retry:
                //throw new RetriableError();
            },
            onerror(err) {
                if (err instanceof FatalError) {
                    throw err; // rethrow to stop the operation
                } else {
                    // do nothing to automatically retry. You can also
                    // return a specific retry interval here.
                }
            }
        });
    }
    async postByFetch(url, config, requestMsg, onProgress, onDone, result) {
        try {
            let response = await fetch(url,
                {
                    method: "post",
                    body: JSON.stringify(requestMsg),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: config.signal,
                });

            if (!response.ok) {
                throw new FatalError("无法连接到服务器");
            }
            const parser = createParser((event) => {
                if (event.type === 'event') {
                    if (event.event === 'data') {
                        result.text = event.data;
                        onProgress(result);
                    }
                }
            })

            const textDecoder = response.body.pipeThrough(new TextDecoderStream()).getReader();
            while (true) {
                const { done, value } = await textDecoder.read();
                if (done) {
                    onDone?.(result);
                    break;
                }
                parser.feed(value);
            }
        } catch (error) {
            result.error = "服务异常: " + error;
            console.log(error)
            onDone?.(result);
        }
    }

    async buildMessages(text, opts) {
        const { chatType = "chat", lang } = opts;
        return { lang, chatType, "prompt": text, stream: true, history: opts.history || [] };
    }

    doRequestPost(config, data) {
        return axios.post(config.url || "", data, config);
    }
}
