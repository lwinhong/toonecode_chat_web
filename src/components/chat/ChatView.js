import { defineComponent, ref } from 'vue'
import * as clipboard from "clipboard-polyfill";
import { v4 as uuidv4 } from "uuid";
import { util, clipboardSvg, checkSvg } from "@/util/index"
import { chatUtil } from "@/util/chatUtil"
import IconUserSvg from "../icons/IconUserSvg.vue";
import IconPencilSvg from "../icons/IconPencilSvg.vue";
import IconAiSvg from "../icons/IconAiSvg.vue";
import { useStore } from '@/stores/useStore'
import { mapState } from 'pinia'
import { getLanguageExtByFilePath } from "@/util/languageExt"
import { renderCodeAndToolBar } from "./CodeToolBar.jsx";
const viewType = { introduction: "introduction", qa: "qa" }

export default defineComponent({
    name: "ChatView",
    components: { IconUserSvg, IconPencilSvg, IconAiSvg },
    data() {
        return {
            currentViewType: viewType.introduction,
            isInProgress: false,
            qaData: { list: [] },
            questionInput: "",
            questionInputDisabled: false,
            showStopButton: false,
            questionInputButtonsVisible: true,
            questionInputButtonsMoreVisible: false,
            //serverConversationId: "" //和服务器通讯的对话结果id，又服务器返回，用于定位这次对话的标识，可以不用传历史。新聊天的时候记得清空它
        }
    },
    computed: {
        ...mapState(useStore, [
            "isInCodeIDE", "isIdeaMode", "isVsCodeMode"
        ]),
        isIntroduction() {
            return this.currentViewType == viewType.introduction
        },
        isQAMode() {
            return this.currentViewType == viewType.qa;
        }
    },
    setup() {
        let qaElementList = ref();
        let questionInputRef = ref();
        let questionInputButtonsMore = ref();
        return { qaElementList, questionInputRef, questionInputButtonsMore }
    },
    methods: {
        onLikeClick(messageData) {
            //qaId
        },
        onDislikeClick(messageData) {

        },
        onClearClick() {
            this.qaData.list = [];
            this.serverConversationId = "";
            this.currentViewType = viewType.introduction;
        },
        async onStopClick(e) {
            e?.preventDefault();
            if (!this.isInProgress) {
                return;
            }
            await chatUtil.stopConversation({ taskId: this.lastServerMessage?.serverTaskId ?? "" });
            try {
                this.abortController?.abort();
            } catch (error) {
                console.log(error);
            }
            //本地模式
            await this.showInProgress({ inProgress: false });

            let existData = this.qaData.list.find(f => f.qaId === this.qaId);
            if (!existData && this.qaData.list.length > 0) {
                existData = this.qaData.list[this.qaData.list.length - 1]
            }
            if (existData) {
                this.addResponse({
                    value: existData.answer,
                    done: true, id: existData?.id ?? this.qaId, autoScroll: true, responseInMarkdown: true,
                    isStop: true
                });
            }
            // }
        },
        onResendClick(message) {
            this.resenEditdVisible = true;
            this.questionInput = message.originQuestion;
            this.questionInputRef?.focus();
        },
        onQuestionKeyEnter(e) {
            e.preventDefault();
            this.addFreeTextQuestion();
        },
        onExportConversation() {
            util.exportConversation(this.qaElementList);
        },
        onAskButtonClick() {
            this.addFreeTextQuestion();
        },
        /**
         * 添加聊天
         */
        async addFreeTextQuestion() {
            const input = this.questionInput;
            this.questionInput = "";
            try {
                if ((input || "").length === 0) {
                    return;
                }
                this.qaId = uuidv4()
                //本地模式，直接请求api
                this.addFreeTextQuestion4Local({ value: input, qaId: this.qaId }).catch(error => {
                    console.error(error);
                });

            } catch (error) {
                console.error(error);
            }
        },
        //本地模式
        async addFreeTextQuestion4Local(message, withHistory = true) {

            await this.showInProgress({ showStopButton: true, inProgress: true });

            this.addQuestion(message)
            this.abortController?.abort();
            this.abortController = new AbortController();
            let history = withHistory && chatUtil.buildHistories(this.qaData.list);
            await chatUtil.sendApiRequest(message.value, {
                qaId: this.qaId,
                serverConversationId: this.lastServerMessage?.serverConversationId,
                abortController: this.abortController,
                history: history || []
            }, (progress) => {
                this.addResponse(progress);
            }, (done) => {
                this.addResponse(done)
                this.isInProgress = false;
            });
        },
        async showInProgress(message) {
            //     return new Promise((resolve) => {
            try {
                this.showStopButton = message.showStopButton ? true : false;
                this.isInProgress = message.inProgress;
                this.questionInputDisabled = message.inProgress;
                this.questionInputButtonsVisible = !message.inProgress;
                if (!message.inProgress) {
                    this.qaId = ""
                }
                console.log("showInProgress:" + message.inProgress)
            } catch (error) {
                console.log(error);
            }

            //     setTimeout(() => {
            //         resolve();
            //     }, 100);
            // })

        },
        addQuestion(message) {
            this.currentViewType = viewType.qa;
            this.qaId = message.qaId ?? uuidv4();
            let { prompt, language, filePath, value, isMarked } = message;

            let question = value;
            let marked = false;
            if (!isMarked && prompt && value) {

                language = language || getLanguageExtByFilePath(filePath);
                value = "```" + language + "\r\n" + value + "\n\n```\n\n" + prompt;
                marked = true

                message.value = value + "\n" + prompt + "\n";
            }
            question = util.escapeHtml(value)
            if (isMarked || marked) {
                question = util.markedParser(question)
            }
            this.qaData.list.push({
                question,
                originQuestion: value,
                qaId: this.qaId,
                answer: "",
                error: "",
                originAnswer: "",
                answer: "",
                done: false
            });
            setTimeout(() => { util.autoScrollToBottom(this.qaElementList); }, 100);
        },
        addResponse(message) {
            this.addResponseCore(message)
            // if (this.isVsCodeMode)
            //     this.addResponseCore(message)
            // else {
            //     this.message = message;
            //     util.throttle(() => this.addResponseCore(this.message), 300)
            // }
        },
        addResponseCore(message) {
            const qaId = message.qaId ?? this.qaId;
            const list = this.qaElementList;
            if (message.error) {
                this.addError(message)
            } else {
                this.lastServerMessage = message.serverMessage;
                let existQA = this.qaData.list.find(f => f.qaId === qaId);
                if (!existQA) {
                    return;
                }

                existQA.originAnswer += message.value;
                let updatedValue = "";
                if (!message.responseInMarkdown) {
                    updatedValue = "```\r\n" + util.unEscapeHtml(existQA.originAnswer) + " \r\n ```";
                } else {
                    updatedValue = existQA.originAnswer.split("```").length % 2 === 1
                        ? existQA.originAnswer : existQA.originAnswer + "\n\n```\n\n";
                }
                const markedResponse = util.markedParser(updatedValue);
                existQA.answer = markedResponse
                existQA.done = message.done === true;
            }

            if (message.done) {
                this.qaId = "";
                this.message = null;
                this.lastServerMessage = null;
                const buildCodeButton = () => {
                    const preCodeList = list.children[list.children.length - 1].querySelectorAll("pre > code");
                    preCodeList.forEach((preCode) => {
                        renderCodeAndToolBar(preCode.parentNode, preCode, this.isInCodeIDE, { onclick: this.codeToolbarClick })
                    });
                    util.autoScrollToBottom(list);
                    this.questionInputRef?.focus();
                };

                if (!message.isStop) {
                    buildCodeButton();
                    this.showInProgress({ inProgress: false })
                } else {
                    setTimeout(buildCodeButton, 100);
                }
            }
            if (message.autoScroll) {
                util.autoScrollToBottom(list);
            }
        },
        addError(message) {
            const qaId = message.qaId ?? this.qaId;
            let exist = this.qaData.list.find(f => f.qaId === qaId);
            if (!exist) {
                return;
            }
            const messageValue = "服务异常" //message.error || '网络异常';
            exist.answer = messageValue;
            // exist.error = messageValue
            if (message.autoScroll) {
                util.autoScrollToBottom(this.qaElementList);
            }
        },
        codeToolbarClick(target, codeEl) {
            switch (target.id) {
                case "copy-code":
                    clipboard.writeText(codeEl.textContent).then(() => {
                        target.innerHTML = `${checkSvg} 已复制`;
                        setTimeout(() => {
                            target.innerHTML = `${clipboardSvg} 复制`;
                        }, 1500);
                    });
                    break;
                case "insert-code":
                    const data1 = {
                        type: "editCode",
                        value: codeEl.textContent,
                    };
                    if (this.isIdeaMode)
                        util.postMessageToIdeaEditor(data1);
                    else
                        util.postMessageToCodeEditor(data1);
                    break;
                case "new-file":
                    let first = codeEl;
                    let value = codeEl?.textContent;
                    let language;
                    if (first) {
                        for (let i = 0; i < first.classList.length; i++) {
                            const c = first.classList[i];
                            if (c.startsWith("language-")) {
                                language = c.substring(c.indexOf('-') + 1);
                                break;
                            }
                        }
                    }
                    let data2 = {
                        type: "openNew",
                        value: value,
                        language
                    };
                    if (this.isIdeaMode)
                        util.postMessageToIdeaEditor(data2);
                    else
                        util.postMessageToCodeEditor(data2);
                    break;
            }
        },
        documnetClickHandler(e) {
            const targetButton = e.target.closest('button');
            // if (targetButton?.classList?.contains("resend-element-ext")) {
            //     targetButton.classList.add("hidden");
            //     return;
            // }

            if (targetButton !== this.questionInputButtonsMore)
                this.questionInputButtonsMoreVisible = false;
        },
        async busEventHandler(data) {
            let { cmd, value } = data;
            switch (cmd) {
                case "ask":
                    this.questionInput = value;
                    this.questionInputRef?.focus();
                    if (!this.isInProgress && !value)
                        this.onAskButtonClick();
                    break;
                case "chat":
                    this.questionInput = value;
                    if (!this.isInProgress && value)
                        this.onAskButtonClick();
                    break;
                case "chat_code":
                    await this.onStopClick();
                    this.qaId = uuidv4()
                    this.addFreeTextQuestion4Local(data, false);
                    break;
                case "selectedText":
                    break;
                case "changeTheme":
                    const handleThemeChange = (val) => {
                        if (!val) {
                            document.documentElement.setAttribute('theme', 'light')
                        } else {
                            document.documentElement.removeAttribute('theme')
                        }
                    }
                    handleThemeChange(!(value || "").toLowerCase().includes("light"));
                    break;
                case "colorChanged":
                    this.colorChangedHandler(value);
                    break;
                default:
                    break;
            }
        },
        colorChangedHandler(colorValue) {
            try {
                let { backColor, foreColor, borderColor } = JSON.parse(colorValue);
                document.documentElement.style.setProperty(`--vscode-foreground`, foreColor);
                document.documentElement.style.setProperty(`--vscode-editor-foreground`, foreColor);
                document.documentElement.style.setProperty(`--vscode-button-secondaryForeground`, foreColor);
                document.documentElement.style.setProperty(`--vscode-input-foreground`, foreColor);

                document.documentElement.style.setProperty(`--vscode-editor-background`, backColor);
                //document.documentElement.style.setProperty(`--vscode-input-background`, backColor);

                document.documentElement.style.setProperty(`--vscode-input-border`, borderColor);

            } catch (error) {

            }
        }
    },
    mounted() {
        // if (this.isVsCodeMode)
        //     window.addEventListener("message", this.messageHandler);
        document.removeEventListener("click", this.documnetClickHandler)
        document.addEventListener("click", this.documnetClickHandler);

        // if (!this.isIdeaMode)
        //     return;
        this.$bus.off("executeCmd", this.busEventHandler)
        this.$bus.on("executeCmd", this.busEventHandler)
        if (import.meta.env.MODE !== 'production') {
            this.questionInput = "生成一个python排序算法"
        }
        //this.fileUploadInputRef.addEventListener('change', this.onUploadFileChange)
    }
})