<template>
    <el-container direction="vertical">
        <el-main id="qaMainId">
            <!--介绍 / 简介 / 引言 / 概述 -->
            <ChatViewWelcome v-if="isIntroduction" />
            <!--问答list-->
            <div class="flex-1 overflow-y-auto" ref="qaElementList" id="qa-list" v-show="isQAMode">
                <template v-for="(message, index) in qaData.list" :key="index">
                    <!-- 问题 -->
                    <div class="chat-card-bg">
                        <div class="p-2 self-end question-element-ext relative chat-card-content-bg">
                            <h2 class="mb-5 flex">
                                <el-icon :size="20" class="mr-2">
                                    <User />
                                </el-icon>你
                            </h2>
                            <div class="overflow-y-auto" v-html="message.question"></div>
                        </div>
                    </div>
                    <!-- 回答 -->
                    <div class="chat-card-bg">
                        <div v-if="message.answer" class="p-2 self-end answer-element-ext chat-card-content-bg">
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
                                    <button type="button" class="btn-dislike" title="踩"
                                        @click="onDislikeClick(message)">
                                        <span role="img" aria-label="dislike" size="12" class="anticon"
                                            :class="{ 'anticon_checked': message.dislike }">
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="dislike"
                                                width="1em" height="1em" fill="currentColor" aria-hidden="true">
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
                        >
                        <h2 class="mb-5 flex">
                            <IconAiSvg />AI
                        </h2>
                        <div class="text-red-400">{{ message.error }}</div>
                    </div> -->
                    </div>
                </template>
            </div>
        </el-main>
        <el-footer :height="'auto'">
            <!-- 正式思考动画 -->
            <ChatViewSpinner v-if="isInProgress" :showStopButton="showStopButton" @stopClick="onStopClick" />
            <!-- 提问框 输入你的问题, 或用'/'调用快捷命令-->
            <div class="p-3 flex items-center pt-2">
                <div class="flex-1 textarea-wrapper">
                    <textarea ref="questionInputRef" class="common-textarea" type="text" rows="1" id="question-input"
                        placeholder="输入你的问题" @keydown.enter.prevent="onQuestionKeyEnter"
                        v-model="questionInput" :disabled="questionInputDisabled" autocomplete="on"></textarea>

                </div>
                <div id="question-input-buttons" class="p-0.5 flex  gap-2 send-erea-items-center"
                    v-show="questionInputButtonsVisible">
                    <button text type="button" id="more-button" title="更多" class="common-button rounded-lg p-0.5"
                        @click="onMoreButtonClick" ref="questionInputButtonsMore">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>

                    <button text type="button" id="ask-button" title="提交"
                        class="common-button ask-button rounded-lg p-0.5" @click="onAskButtonClick"
                        :disabled="!questionInput || questionInput.length === 0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </el-footer>
    </el-container>
    <context-menu v-model:show="moreContextMenu.show" :options="moreContextMenu.option">
        <context-menu-item label="新的对话" @click="onClearClick">
            <template #icon>
                <el-icon>
                    <Plus />
                </el-icon>
            </template>
        </context-menu-item>
        <context-menu-item label="导出markdown" v-if="isVsCodeMode && qaData.list && qaData.list.length > 0"
            @click="onExportConversation">
            <template #icon>
                <el-icon>
                    <Download />
                </el-icon>
            </template>
        </context-menu-item>
    </context-menu>

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

.el-main {
    padding: 0px !important;
}

.el-footer {
    padding: 0px !important;
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
}

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

.mx-context-menu-express {
    padding: 4px 0px !important;
    --mx-menu-placeholder-width: 0px;
    --mx-menu-backgroud-radius: 3px;
}

.mx-context-menu-express .mx-context-menu-item {
    padding: 4px 8px !important;
}
</style>