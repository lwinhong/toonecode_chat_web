<template>
    <header class="u-header">
        <div class="u-viewsHd">
            <h2 @click="tabHeanderClick('aiTab', $event)" :class="{ 's-selected': isAiMode }">AI 问答</h2>
            <h2 @click="tabHeanderClick('toolsTab')" :class="{ 's-selected': isToolsMode }">工具箱</h2>
        </div>
        <div class="u-tab-extends">
            <div v-show="isAiMode" class="tabContent">
                <slot name="aiExt"></slot>
            </div>
            <div v-show="isToolsMode" class="tabContent">
                <slot name="toolsExt"></slot>
            </div>
        </div>
    </header>
    <main class="u-viewsBd">
        <div v-show="isAiMode" class="tabContent">
            <slot name="ai"></slot>
        </div>
        <div v-show="isToolsMode" class="tabContent">
            <slot name="tools"></slot>
        </div>
    </main>
</template>
<script setup>
import { ref, computed } from 'vue'

const activeName = ref('aiTab')

const tabHeanderClick = (tab, event) => {
    activeName.value = tab;
}

const isAiMode = computed(() => activeName.value === 'aiTab');
const isToolsMode = computed(() => activeName.value === 'toolsTab');

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

.u-header {
    display: flex;
    gap: 10px;
}

.u-header .u-tab-extends {
    display: flex;
    /* justify-items: end; */
    /* align-content: end; */
    flex-grow: 1;
    gap: 10px;
    flex-shrink: 2;
    flex-direction: row-reverse;
    align-self: center;
    flex-wrap: nowrap;
    padding-right: 10px;
}
</style>