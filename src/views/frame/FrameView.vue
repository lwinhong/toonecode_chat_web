<template>
    <!-- <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="AI 提问" name="aiTab">
            <slot name="ai"></slot>
        </el-tab-pane>
        <el-tab-pane label="工具箱" name="toolsTab">
            <slot name="tools"></slot>
        </el-tab-pane>
    </el-tabs> -->
    <header>
        <div class="u-viewsHd">
            <h2 @click="tabHeanderClick('aiTab', $event)" :class="{ 's-selected': activeName === 'aiTab' }">AI 问答</h2>
            <h2 @click="tabHeanderClick('toolsTab')" :class="{ 's-selected': activeName === 'toolsTab' }">工具箱</h2>
        </div>
    </header>
    <main class="u-viewsBd">
        <!-- <template v-show="activeName === 'aiTab'"> -->
        <div v-show="activeName === 'aiTab'" class="tabContent">
            <slot name="ai"></slot>
        </div>
        <div v-show="activeName === 'toolsTab'" class="tabContent">
            <slot name="tools"></slot>
        </div>
    </main>
</template>
<script setup>
import { ref } from 'vue'

const activeName = ref('aiTab')

const tabHeanderClick = (tab, event) => {
    activeName.value = tab;
}
</script>
<style>
.u-viewsHd {
    display: flex;
    padding-left: 16px;
    gap: 16px;
    align-items: center;
}

.u-viewsHd h2 {
    position: relative;
    display: inline-block;
    font-weight: normal;
    opacity: .5;
    cursor: pointer;
    transition: .3s;
}

.u-viewsHd h2:hover {
    opacity: 1;
}

.u-viewsHd h2:after {
    position: absolute;
    bottom: -8px;
    left: 50%;
    content: '';
    width: 0;
    height: 3px;
    border-radius: 3px;
    background: var(--vscode-editor-foreground);
    transform: translateX(-50%);
    transition: .3s;
}

.u-viewsHd h2+h2 {
    margin-left: 48px;
}

.u-viewsHd h2.s-selected {
    font-weight: bold;
    opacity: 1;
}

.u-viewsHd h2.s-selected:after {
    width: 30px;
}

.u-viewsBd {
    flex: 1;
    display: flex;
    /* align-items: stretch; */
}

.u-viewsBd .tabContent {
    flex: 1;
    display: flex;
}
</style>