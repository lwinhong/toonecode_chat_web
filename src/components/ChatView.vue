<template>
    <div class="flex flex-col h-screen">
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
                        <li class="features-li w-full border border-zinc-700 p-3 rounded-md">改进你的代码，添加测试并发现bug</li>
                        <li class="features-li w-full border border-zinc-700 p-3 rounded-md">自动复制或创建新文件</li>
                        <li class="features-li w-full border border-zinc-700 p-3 rounded-md">语法高亮与自动语言检测</li>
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
        <div class="flex-1 overflow-y-auto" id="qa-list" data-license="isc-gnc" v-for="(message, index) in qaData.list"
            :key="index" v-show="isQAMode">
            <!-- 问题 -->
            <div class="chat-card-bg">
                <div class="p-4 self-end question-element-ext relative chat-card-content-bg rounded-lg">
                    <h2 class="mb-5 flex" data-license="isc-gnc">
                        <IconUserSvg />你
                    </h2>
                    <no-export class="mb-2 flex items-center" data-license="isc-gnc">
                        <button title="编辑并重新提问"
                            class="resend-element-ext p-1.5 flex items-center rounded-lg absolute right-6 top-6">
                            <IconPencilSvg />
                        </button>
                        <div class="hidden send-cancel-elements-ext flex gap-2">
                            <button title="Send this prompt" class="send-element-ext p-1 pr-2 flex items-center">
                                <IconSendSvg />&nbsp;发送
                            </button>
                            <button title="Cancel" class="cancel-element-ext p-1 pr-2 flex items-center">
                                <IconCancelSvg />&nbsp;取消
                            </button>
                        </div>
                    </no-export>
                    <div class="overflow-y-auto">{{ message.question }}</div>
                </div>
            </div>
            <!--回答-->
            <div class="chat-card-bg" v-if="message.anser">
                <div data-license="isc-gnc" class="p-4 self-end answer-element-ext chat-card-content-bg">
                    <h2 class="mb-5 flex">
                        <IconAiSvg />TooneCode
                    </h2>
                    <div :class="{ 'result-streaming': message.done !== true }" @id="message.messageId"
                        v-html="message.anser">
                    </div>
                    <div></div>
                </div>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto" id="conversation-list" data-license="isc-gnc" v-show="isQAMode"></div>

        <!-- 正式思考动画 -->
        <div id="in-progress" class="pl-4 pt-2 flex items-center" data-license="isc-gnc" v-show="isInProgress">
            <div class="typing">正在思考</div>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>

            <button id="stop-button" class="btn btn-primary flex items-end p-1 pr-2 rounded-md ml-5"
                v-show="showStopButton">
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
                <textarea type="text" rows="1" data-license="isc-gnc" id="question-input" placeholder="输入一个问题..."
                    @keydown.enter.prevent="onQuestionKeyEnter" v-model="questionInput"
                    :disabled="questionInputDisabled"></textarea>
            </div>
            <div id="chat-button-wrapper"
                class="absolute bottom-14 items-center more-menu right-8 border border-gray-200 shadow-xl hidden text-xs"
                data-license="isc-gnc">
                <button class="flex gap-2 items-center justify-start p-2 w-full" id="clear-button"
                    @click="onClearClick"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>&nbsp;新的聊天</button>
                <button class="flex gap-2 items-center justify-start p-2 w-full" id="settings-button"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>&nbsp;更新设置</button>
                <button class="flex gap-2 items-center justify-start p-2 w-full" id="export-button"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>&nbsp;导出markdown</button>
            </div>
            <div id="question-input-buttons" class="right-6 absolute p-0.5 ml-5 flex items-center gap-2"
                v-show="questionInputButtonsVisible">
                <button id="more-button" title="More actions" class="rounded-lg p-0.5" data-license="isc-gnc">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>

                <button id="ask-button" title="提交提示" class="ask-button rounded-lg p-0.5">
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
import { v4 as uuidv4 } from "uuid";
import { util, clipboardSvg, plusSvg, insertSvg } from "../util/index"
import { chatUtil } from "../util/chatUtil"
import IconUserSvg from "./icons/IconUserSvg.vue";
import IconPencilSvg from "./icons/IconPencilSvg.vue";
import IconSendSvg from "./icons/IconSendSvg.vue";
import IconCancelSvg from "./icons/IconCancelSvg.vue";
import IconAiSvg from "./icons/IconAiSvg.vue";

const viewType = { introduction: "introduction", qa: "qa" }

export default {
    name: "ChatView",
    components: { IconUserSvg, IconPencilSvg, IconSendSvg, IconCancelSvg, IconAiSvg },
    data() {
        return {
            currentViewType: viewType.qa,
            isInProgress: false,
            qaData: { list: [] },
            questionInput: "",
            questionInputDisabled: false,
            showStopButton: false,
            questionInputButtonsVisible: true,
            lastQuestionId: ""
        }
    },
    computed: {
        isIntroduction() {
            return this.currentViewType == viewType.introduction
        },
        isQAMode() {
            return this.currentViewType == viewType.qa;
        }
    },
    methods: {
        onClearClick() {
            this.qaData.list = [];
            this.currentViewType = viewType.qa;
        },
        onQuestionKeyEnter(e) {
            e.preventDefault();
            this.addFreeTextQuestion();
        },
        onExportConversation() {
            util.exportConversation(document.getElementById("qa-list"));
        },
        /**
         * 添加聊天
         */
        async addFreeTextQuestion() {
            const input = this.questionInput;
            this.questionInput = "";
            if (input?.length > 0) {
                const result = util.postMessageToVsCode({
                    type: "addFreeTextQuestion",
                    value: input,
                });
                if (result !== true) {
                    //本地模式
                    this.showInProgress({ showStopButton: true, inProgress: true });
                    this.addQuestion({ value: input })
                    await chatUtil.sendApiRequest(input, { questionId: this.lastQuestionId },
                        (progress) => {
                            this.addResponse(progress);
                        },
                        (done) => {
                            this.addResponse(done)
                            this.isInProgress = false;
                        });
                }
            }
        },
        test() {
            // //问答列表
            // let test = {
            //     question: util.escapeHtml("你好"),
            //     id: "1",
            //     anser: "你好我是属性信息寻 ```\r\n<button title='Cancel' class='cancel-element-ext p-1 pr-2 flex items-center'><IconCancelSvg />&nbsp;取消</button>\n\n```\n\n",
            //     done: false
            // };
            // const markedResponse = util.markedParser(test.anser);
            // test.anser = markedResponse;

            // this.qaData.list.push(test);

            // setTimeout(() => {
            //     test.done = true
            // }, 3000);
        },
        showInProgress(message) {
            this.showStopButton = message.showStopButton ? true : false;
            if (message.inProgress) {
                this.isInProgress = true;
                this.questionInputDisabled = true;
                this.questionInputButtonsVisible = false;
            } else {
                this.isInProgress = false;
                this.questionInputDisabled = false;
                this.questionInputButtonsVisible = true;
            }
        },
        addQuestion(message) {
            this.currentViewType = viewType.qa;
            this.lastQuestionId = uuidv4();
            this.qaData.list.push({
                question: util.escapeHtml(message.value),
                id: this.lastQuestionId,
                messageId: "",
                anser: "",
                done: false
            });
        },
        addResponse(message) {
            const list = document.getElementById("qa-list");
            let existingMessage = document.getElementById(message.id);
            let existingMessageData = this.qaData.list.find(f => f.id === this.lastQuestionId);
            if (existingMessageData || existingMessage) {
                return;
            }

            let updatedValue = "";
            if (!message.responseInMarkdown) {
                updatedValue = "```\r\n" + util.unEscapeHtml(message.value) + " \r\n ```";
            } else {
                updatedValue = message.value.split("```").length % 2 === 1 ? message.value : message.value + "\n\n```\n\n";
            }

            const markedResponse = util.markedParser(updatedValue);
            existingMessageData.anser = markedResponse
            if (message.done) {
                existingMessageData.done = true;
                this.lastQuestionId = ""
                const preCodeList = list.lastChild.querySelectorAll("pre > code");
                preCodeList.forEach((preCode) => {
                    preCode.classList.add("input-background", "p-4", "pb-2", "block", "whitespace-pre", "overflow-x-scroll");
                    preCode.parentElement.classList.add("pre-code-element", "relative");

                    const buttonWrapper = document.createElement("no-export");
                    buttonWrapper.classList.add("code-actions-wrapper", "flex", /*"gap-3",*/ "pr-2", "pt-1", "pb-1", "flex-wrap", "items-center", "justify-end", /*"rounded-t-lg",*/ "input-background");

                    // Create copy to clipboard button
                    const copyButton = document.createElement("button");
                    copyButton.title = "复制到剪切板";
                    copyButton.innerHTML = `${clipboardSvg} 复制`;

                    copyButton.classList.add("code-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");

                    const insert = document.createElement("button");
                    insert.title = "将以上内容插入到当前文件";
                    insert.innerHTML = `${insertSvg} 插入`;

                    insert.classList.add("edit-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");

                    const newTab = document.createElement("button");
                    newTab.title = "新建文件并将以上代码置入";
                    newTab.innerHTML = `${plusSvg} 新建`;

                    newTab.classList.add("new-code-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");

                    buttonWrapper.append(copyButton, insert, newTab);

                    // if (preCode.parentNode.previousSibling) {
                    //     const after = preCode.parentNode.parentElement?.insertAfter;
                    //     if (after) {
                    //         after(buttonWrapper, preCode.parentElement.previousSibling);
                    //     }
                    // } else {
                    //        preCode.parentNode.parentElement.append(buttonWrapper);
                    //}

                    preCode.parentNode.append(buttonWrapper);

                });
            }
            if (message.autoScroll && (message.done || markedResponse.endsWith("\n"))) {
                util.autoScrollToBottom(list);
            }
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
            }
        }
    },
    mounted() {
        this.test();
        window.addEventListener("message", this.messageHandler);
    }
}

</script>

<style></style>