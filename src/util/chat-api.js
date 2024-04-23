import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//let _historyCount = 3;
// const HUMAN_ROLE_START_TAG = "<s>human\n";
// const BOT_ROLE_START_TAG = "<s>bot\n";
// const ENDOFTEXT = "<|endoftext|>";

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
            config.data = requestMsg;

            try {
                let url = "/api" + config.url
                if (import.meta.env.MODE === 'production') {
                    url = import.meta.env.VITE_API_BASE_URL + config.url; //
                }
                let response = await fetch(url,
                    {
                        method: "post",
                        body: JSON.stringify(requestMsg),
                        headers: { 'Content-Type': 'application/json' },
                        signal: abortSignal,
                        //mode: 'no-cors'
                    });

                // const reader = response.body.getReader();
                const textDecoder = response.body.pipeThrough(new TextDecoderStream()).getReader();
                let readEnd = true;

                while (readEnd) {
                    const { done, value } = await textDecoder.read();

                    if (done) {
                        onDone?.(result);
                        readEnd = false;
                        break;
                    }
                    result.text = value;
                    onProgress(result);
                }
            } catch (error) {
                result.error = "服务异常，请稍后再试 " + error;
                console.log(error)
                onDone?.(result);
            }
        }
        else {
            const response = await this.doRequestPost(config, {});
            result.text = response.data;
            onDone?.(result);
        }
        return result;
    }

    async buildMessages(text, opts) {
        const { chatType = "chat", lang } = opts;
        return { lang, chatType, "prompt": text, stream: true, history: opts.history || [] };
    }

    doRequestPost(config, data) {
        return axios.post(config.url || "", data, config);
    }
}
