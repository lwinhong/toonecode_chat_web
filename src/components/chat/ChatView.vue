<template>
    <div class="flex flex-col " :class="{ 'chat-box-600': (!isIdeaMode && !isVsCodeMode) }" style="flex-grow:1;">
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
            <!-- <div class="flex flex-col gap-4 h-full items-center justify-end text-center">
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
            </div> -->

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
                <!-- 回答 -->
                <div class="chat-card-bg">
                    <div v-if="message.answer" data-license="isc-gnc"
                        class="p-2 self-end answer-element-ext chat-card-content-bg">
                        <h2 class="mb-5 flex">
                            <IconAiSvg style="margin-right: 0.5rem;" />TooneCode
                        </h2>
                        <div :class="{ 'result-streaming': message.done !== true }" :id="message.qaId"
                            v-html="message.answer">
                        </div>
                        <!-- 反馈-->
                        <div class="code-chat-box-like-wrapper" v-if="message.done">
                            <div class="rating-panel">
                                <button type="button" class="btn-like" title="赞" @click="onLikeClick(message)">
                                    <span role="img" aria-label="like" size="12" class="anticon"
                                        :class="{ 'anticon_checked': message.like }">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="like" width="1em"
                                            height="1em" fill="currentColor" aria-hidden="true">
                                            <path
                                                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z">
                                            </path>
                                        </svg>
                                    </span>
                                </button>
                                <button type="button" class="btn-dislike" title="踩" @click="onDislikeClick(message)">
                                    <span role="img" aria-label="dislike" size="12" class="anticon"
                                        :class="{ 'anticon_checked': message.dislike }">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="dislike" width="1em"
                                            height="1em" fill="currentColor" aria-hidden="true">
                                            <path
                                                d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z">
                                            </path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- <div v-if="message.error" class="p-2 self-end answer-element-ext chat-card-content-bg"
                        data-license="isc-gnc">
                        <h2 class="mb-5 flex">
                            <IconAiSvg />AI
                        </h2>
                        <div class="text-red-400">{{ message.error }}</div>
                    </div> -->
                </div>
            </template>
        </div>

        <!-- <div class="flex-1 overflow-y-auto hidden" id="conversation-list" data-license="isc-gnc" v-show="isQAMode">
        </div> -->

        <!-- 正式思考动画 -->
        <div id="in-progress" class="pl-4 pt-2 flex items-center" data-license="isc-gnc" v-if="isInProgress">
            <div class="typing">正在思考</div>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>

            <button id="stop-button" type="button" class="btn btn-primary flex items-end p-1 pr-2 rounded-md ml-5"
                v-show="showStopButton" @click="onStopClick">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>停止</button>
        </div>

        <!-- 提问框 -->
        <div class="p-3 flex items-center pt-2" data-license="isc-gnc">
            <div class="flex-1 textarea-wrapper">
                <!-- <textarea type="text" rows="1" data-license="isc-gnc" id="question-input" placeholder="输入一个问题..."
                    onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea> -->
                <textarea ref="questionInputRef" class="common-textarea" type="text" rows="1" data-license="isc-gnc"
                    id="question-input" placeholder="输入一个问题..." @keydown.enter.prevent="onQuestionKeyEnter"
                    v-model="questionInput" :disabled="questionInputDisabled"></textarea>
            </div>
            <div id="question-input-buttons" class="p-0.5 flex  gap-2 send-erea-items-center"
                v-show="questionInputButtonsVisible">
                <button text type="button" id="more-button" title="更多" class="common-button rounded-lg p-0.5"
                    data-license="isc-gnc" @click="onMoreButtonClick" ref="questionInputButtonsMore">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>

                <button text type="button" id="ask-button" title="提交" class="common-button ask-button rounded-lg p-0.5"
                    @click="onAskButtonClick" :disabled="!questionInput || questionInput.length === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
        <context-menu v-model:show="moreContextMenu.show" :options="moreContextMenu.option">
            <context-menu-item label="新的聊天" @click="onClearClick">
                <template #icon>
                    <IconPlusSvg />
                </template>
            </context-menu-item>
            <context-menu-item label="导出markdown" v-if="isVsCodeMode && qaData.list && qaData.list.length > 0"
                @click="onExportConversation">
                <template #icon>
                    <IconDownloadSvg />
                </template>
            </context-menu-item>
        </context-menu>
    </div>
</template>
<script>
import ChatView from "./ChatView.js"
export default ChatView
</script>
<style lang="scss">
@use "sass:meta";

html[data-code-theme="dark"] {
    @include meta.load-css("highlight.js/styles/atom-one-dark.css");
}

html[data-code-theme="light"] {
    @include meta.load-css("highlight.js/styles/atom-one-light.css");
}

.code-chat-box-like-wrapper {
    margin-top: 7px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.code-chat-box-like-wrapper .rating-panel {
    display: flex;
    justify-content: flex-end;
}

.rating-panel .btn-like,
.rating-panel .btn-dislike {
    background-color: transparent !important;
    padding: 0;
    font-size: var(--code-editor-font-size);
    margin-bottom: 0;
    margin-right: 5px;
    margin-left: 10px;
    cursor: pointer;
    height: 100%;
    border: none;
    color: #999;
    outline: 0px solid transparent !important;
    ;
}

// .rating-panel .btn-like:hover,
// .rating-panel .btn-dislike:hover {
//     border-radius: 3px;
//     background: var(--vscode-button-secondaryHoverBackground);
//     transition: .3s;
// }

// .rating-panel .btn-like:active,
// .rating-panel .btn-dislike:active {
//     border-radius: 3px;
//     background: var(--vscode-button-secondaryHoverBackground);
//     transition: .3s;
// }

.rating-panel .anticon {
    display: inline-flex;
    align-items: center;
    color: var(--tc-chat-card-content-like-unchecked);
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.rating-panel .anticon_checked {
    color: var(--tc-chat-card-content-like-checked) !important;
}

.rating-panel .anticon svg {
    display: inline-block;
}

.rating-panel .anticon>* {
    line-height: 1;
}
</style>