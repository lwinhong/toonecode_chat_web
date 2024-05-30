<template>
    <div class="flex flex-col h-screen " :class="{ 'chat-box-600': (!isIdeaMode && !isVsCodeMode) }">
        <!--介绍 / 简介 / 引言 / 概述 -->
        <div id="introduction" v-if="isIntroduction"
            class="flex flex-col justify-between h-full justify-center px-6 w-full relative login-screen overflow-auto">
            <div data-license="isc-gnc-hi-there" class="flex items-start text-center features-block my-5">
                <div class="flex flex-col gap-3.5 flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" class="w-6 h-6 m-auto">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                    </svg>
                    <h2>特性</h2>
                    <ul class="flex flex-col gap-3.5 text-xs">
                        <li class="features-li w-full border border-zinc-700 p-3 rounded-md">改进你的代码，生成测试</li>
                        <li class="features-li w-full border border-zinc-700 p-3 rounded-md">解析和注释代码</li>
                        <li class="features-li w-full border border-zinc-700 p-3 rounded-md">自动复制或创建新文件</li>
                        <!--<li class="features-li w-full border border-zinc-700 p-3 rounded-md">语法高亮与自动语言检测</li>-->
                    </ul>
                </div>
            </div>
            <div class="flex flex-col gap-4 h-full items-center justify-end text-center">
                <button id="login-button" class="mb-4 btn btn-primary flex gap-2 justify-center p-3 rounded-md"
                    v-show="false">登录</button>
                <button id="list-conversations-link"
                    class="hidden mb-4 btn btn-primary flex gap-2 justify-center p-3 rounded-md"
                    title="You can access this feature via the kebab menu below. NOTE: Only available with Browser Auto-login method">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>&nbsp;Show conversations
                </button>
                <p class="max-w-sm text-center text-xs text-slate-500" v-show="false">
                    <a title="" id="settings-button" href="#">修改设置</a>&nbsp; | &nbsp;<a title=""
                        id="settings-prompt-button" href="#">更新提示词</a>
                </p>
            </div>

        </div>

        <!--问答list-->
        <div class="flex-1 overflow-y-auto" ref="qaElementList" id="qa-list" data-license="isc-gnc" v-show="isQAMode">
            <template v-for="(message, index) in qaData.list" :key="index">
                <!-- 问题 -->
                <div class="chat-card-bg">
                    <div class="p-2 self-end question-element-ext relative chat-card-content-bg">
                        <h2 class="mb-5 flex" data-license="isc-gnc">
                            <IconUserSvg />你
                        </h2>
                        <!-- <div class="mb-2 flex items-center" data-license="isc-gnc">
                            <button title="编辑并重新提问" @click="onResendClick(message)"
                                class="resend-element-ext p-1.5 flex items-center rounded-lg absolute right-6 top-6">
                                <IconPencilSvg />
                            </button>
                            <div class="send-cancel-elements-ext flex gap-2" v-show="resenEditdVisible">
                                <button title="发送这个提示" class="send-element-ext p-1 pr-2 flex items-center"
                                    @click="onResendSendClick(message.question)">
                                    <IconSendSvg />&nbsp;发送
                                </button>
                                <button title="取消" @click="onResendCancelClick"
                                    class="cancel-element-ext p-1 pr-2 flex items-center">
                                    <IconCancelSvg />&nbsp;取消
                                </button>
                            </div>
                        </div> -->
                        <!-- <div class="overflow-y-auto">{{ message.question }}</div> -->
                        <div class="overflow-y-auto" v-html="message.question"></div>
                    </div>
                </div>
                <!--回答-->
                <div class="chat-card-bg">
                    <div v-if="message.answer" data-license="isc-gnc"
                        class="p-2 self-end answer-element-ext chat-card-content-bg">
                        <h2 class="mb-5 flex">
                            <IconAiSvg style="margin-right: 0.5rem;" />TooneCode
                        </h2>
                        <div :class="{ 'result-streaming': message.done !== true }" @id="message.qaId"
                            v-html="message.answer">
                        </div>
                        <div></div>
                    </div>
                    <div v-if="message.error" class="p-4 self-end mt-4 pb-8 error-element-ext" data-license="isc-gnc">
                        <h2 class="mb-5 flex">
                            <IconAiSvg />AI
                        </h2>
                        <div class="text-red-400">{{ message.error }}</div>
                    </div>
                </div>
            </template>

        </div>

        <!-- <div class="flex-1 overflow-y-auto hidden" id="conversation-list" data-license="isc-gnc" v-show="isQAMode">
        </div> -->

        <!-- 正式思考动画 -->
        <div id="in-progress" class="pl-4 pt-2 flex items-center" data-license="isc-gnc" v-show="isInProgress">
            <div class="typing">正在思考</div>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>

            <button id="stop-button" class="btn btn-primary flex items-end p-1 pr-2 rounded-md ml-5"
                v-show="showStopButton" @click="onStopClick">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>停止</button>
        </div>

        <!-- 提问框 -->
        <div class="p-4 flex items-center pt-2" data-license="isc-gnc">
            <div class="flex-1 textarea-wrapper">
                <!-- <textarea type="text" rows="1" data-license="isc-gnc" id="question-input" placeholder="输入一个问题..."
                    onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea> -->
                <textarea ref="questionInputRef" type="text" rows="1" data-license="isc-gnc" id="question-input"
                    placeholder="输入一个问题..." @keydown.enter.prevent="onQuestionKeyEnter" v-model="questionInput"
                    :disabled="questionInputDisabled"></textarea>
            </div>
            <div id="chat-button-wrapper"
                class="absolute bottom-14 items-center more-menu right-8 border border-gray-200 shadow-xl text-xs"
                data-license="isc-gnc" v-show="questionInputButtonsMoreVisible"
                @click="questionInputButtonsMoreVisible = false">
                <button class="flex gap-2 items-center justify-start p-2 w-full" id="clear-button"
                    @click="onClearClick"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>&nbsp;新的聊天</button>
                <!-- <button v-if="isVsCodeMode" class="flex gap-2 items-center justify-start p-2 w-full"
                    id="settings-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>&nbsp;更新设置</button> -->
                <button v-if="isVsCodeMode" class="flex gap-2 items-center justify-start p-2 w-full" id="export-button"
                    @click="onExportConversation"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>&nbsp;导出markdown</button>
            </div>
            <div id="question-input-buttons" class="p-0.5 flex  gap-2 send-erea-items-center"
                v-show="questionInputButtonsVisible">
                <button id="more-button" title="More actions" class="rounded-lg p-0.5" data-license="isc-gnc"
                    @click="questionInputButtonsMoreVisible = true" ref="questionInputButtonsMore">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>

                <button id="ask-button" title="提交提示" class="ask-button rounded-lg p-0.5" @click="onAskButtonClick"
                    :disabled="!questionInput || questionInput.length === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import * as clipboard from "clipboard-polyfill";
import { v4 as uuidv4 } from "uuid";
import { util, clipboardSvg, plusSvg, insertSvg, checkSvg } from "../util/index"
import { chatUtil } from "../util/chatUtil"
import IconUserSvg from "./icons/IconUserSvg.vue";
import IconPencilSvg from "./icons/IconPencilSvg.vue";
// import IconSendSvg from "./icons/IconSendSvg.vue";
// import IconCancelSvg from "./icons/IconCancelSvg.vue";
import IconAiSvg from "./icons/IconAiSvg.vue";
import { useStore } from '@/stores/useStore'
import { mapState } from 'pinia'
import { ref } from "vue";
import { getLanguageExtByFilePath } from "../util/languageExt"
// import { Cache } from "@/util/cache/cacheUtil";
// const cacheHistories = new Cache();
const viewType = { introduction: "introduction", qa: "qa" }

export default {
    name: "ChatView",
    components: { IconUserSvg, IconPencilSvg, IconAiSvg, /*IconSendSvg, IconCancelSvg*/ },
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
            if (message.done) {
                existQA.done = true;
                this.qaId = "";
                this.message = null;

                const buildCodeButton = () => {
                    const preCodeList = list.children[list.children.length - 1].querySelectorAll("pre > code");
                    preCodeList.forEach((preCode) => {
                        preCode.classList.add("input-background", "p-4", "pb-2", "block", "whitespace-pre", "overflow-x-scroll");
                        preCode.parentElement.classList.add("pre-code-element", "relative");

                        const buttonWrapper = document.createElement("div");
                        buttonWrapper.classList.add("code-actions-wrapper", "flex", /*"gap-3",*/ "pr-2", "pt-1", "pb-1", "flex-wrap", "items-center", "justify-end", /*"rounded-t-lg",*/ "input-background");

                        // let buttonsHtml = `<button title="复制到剪切板" class="code-element-ext p-1 pr-2 flex items-center rounded-lg">${clipboardSvg} 复制</button>`;

                        // if (this.isVsCodeMode) {
                        //     buttonsHtml += `<button title="将以上内容插入到当前文件"
                        //              class="edit-element-ext p-1 pr-2 flex items-center rounded-lg">${insertSvg} 插入</button>
                        //         <button title="新建文件并将以上代码置入" class="new-code-element-ext p-1 pr-2 flex items-center rounded-lg">${plusSvg} 新建</button> `;
                        // }
                        // buttonWrapper.innerHTML = buttonsHtml;

                        // Create copy to clipboard button
                        const copyButton = document.createElement("button");
                        copyButton.title = "复制到剪切板";
                        copyButton.innerHTML = `${clipboardSvg} 复制`;

                        copyButton.classList.add("code-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");
                        buttonWrapper.append(copyButton);

                        if (this.isInCodeIDE) {
                            const insert = document.createElement("button");
                            insert.title = "将以上内容插入到当前文件";
                            insert.innerHTML = `${insertSvg} 插入`;

                            insert.classList.add("edit-element-ext", "p-1", "pr-2", "ml-1", "flex", "items-center", "rounded-lg");

                            const newTab = document.createElement("button");
                            newTab.title = "新建文件并将以上代码置入";
                            newTab.innerHTML = `${plusSvg} 新建`;

                            newTab.classList.add("new-code-element-ext", "p-1", "pr-2", "ml-1", "flex", "items-center", "rounded-lg");
                            buttonWrapper.append(insert, newTab);
                        }

                        preCode.parentNode.append(buttonWrapper);
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
            if (message.autoScroll && (message.done || markedResponse.endsWith("\n"))) {
                util.autoScrollToBottom(list);
            }
        },
        addError(message) {
            const qaId = message.qaId ?? this.qaId;
            let exist = this.qaData.list.find(f => f.qaId === qaId);
            if (!exist) {
                return;
            }
            const messageValue = message.value || "An error occurred. If this issue persists please clear your session token with `ChatGPT: Reset session` command and/or restart your Visual Studio Code. If you still experience issues, it may be due to outage on https://openai.com services.";
            exist.answer = "";
            exist.error = util.markedParser(messageValue)
            if (message.autoScroll) {
                util.autoScrollToBottom(this.qaElementList);
            }
        },
        documnetClickHandler(e) {
            const targetButton = e.target.closest('button');
            if (targetButton?.classList?.contains("resend-element-ext")) {
                // e.preventDefault();
                // const question = targetButton.closest(".question-element-ext");
                // const elements = targetButton.nextElementSibling;
                // elements.classList.remove("hidden");
                // question.lastElementChild?.setAttribute("contenteditable", true);

                targetButton.classList.add("hidden");
                return;
            }
            if (targetButton?.classList?.contains("code-element-ext")) {
                e.preventDefault();

                clipboard.writeText(targetButton.parentElement.parentElement?.firstElementChild?.textContent).then(() => {
                    targetButton.innerHTML = `${checkSvg} 已复制`;
                    setTimeout(() => {
                        targetButton.innerHTML = `${clipboardSvg} 复制`;
                    }, 1500);
                });

                return;
            }
            if (targetButton?.classList?.contains("edit-element-ext")) {
                e.preventDefault();
                const data = {
                    type: "editCode",
                    value: targetButton.parentElement.parentElement?.firstElementChild?.textContent,
                };
                if (this.isIdeaMode)
                    util.postMessageToIdeaEditor(data);
                else
                    util.postMessageToCodeEditor(data);
                return;
            }
            if (targetButton?.classList?.contains("new-code-element-ext")) {
                e.preventDefault();
                let first = targetButton.parentElement.parentElement?.firstElementChild;
                let value = first?.textContent;
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
                let data = {
                    type: "openNew",
                    value: value,
                    language
                };
                if (this.isIdeaMode)
                    util.postMessageToIdeaEditor(data);
                else
                    util.postMessageToCodeEditor(data);
                return;
            }
            if (targetButton !== this.questionInputButtonsMore)
                this.questionInputButtonsMoreVisible = false;
        },
        messageHandler(event) {
            const message = event.data;
            switch (message.type) {
                case "showInProgress":
                    this.showInProgress(message);
                    break;
                case "addResponse":
                    this.addResponse(message);
                    break;
                case "addQuestion":
                    this.addQuestion(message);
                    break;
                case "loginSuccessful":
                    break;
                case "addError":
                    this.addError(message)
                    break;
                case "clearConversation":
                    this.onClearClick();
                    break;
                case "exportConversation":
                    this.onExportConversation();
                    break;
                case "textSelectionChanged":
                    // const input = document.getElementById("question-input");
                    // input.value = message.text;
                    break;
                case "chat_code":
                case "ask":
                    message.cmd = message.type;
                    this.busEventHandler(message);
                    break;
            }
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
        if (this.isVsCodeMode)
            window.addEventListener("message", this.messageHandler);
        document.removeEventListener("click", this.documnetClickHandler)
        document.addEventListener("click", this.documnetClickHandler);

        // if (!this.isIdeaMode)
        //     return;
        this.$bus.off("executeCmd", this.busEventHandler)
        this.$bus.on("executeCmd", this.busEventHandler)
        if (import.meta.env.MODE !== 'production') {
            this.questionInput = "生成一个python排序算法"
        }
    }
}
</script>
<style lang="scss">
@use "sass:meta";

html[data-code-theme="dark"] {
    @include meta.load-css("highlight.js/styles/atom-one-dark.css");
}

html[data-code-theme="light"] {
    @include meta.load-css("highlight.js/styles/atom-one-light.css");
}

.chat-box-600 {
    display: flex;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

/* Chrome, Safari, and Opera */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    /* 设置滚动条宽度 */
}

::-webkit-scrollbar-track {
    background: --var(--vscode-editor-background);
    /*#f1f1f1;*/
    border-radius: 2px;
    /* 滚动条轨道背景色 */
}

::-webkit-scrollbar-thumb {
    background: #888;
    /* 滚动条滑块背景色 */
    border-radius: 2px;
    /* 滑块圆角 */
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 滑块悬停时的背景色 */
    border-radius: 2px;
}
</style>