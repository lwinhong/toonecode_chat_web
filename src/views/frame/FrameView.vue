<template>
    <header class="u-header">
        <div class="u-viewsHd">
            <h2 @click="tabHeanderClick('aiTab', $event)" :class="{ 's-selected': isAiMode }">AI 问答</h2>
            <h2 @click="tabHeanderClick('toolsTab')" :class="{ 's-selected': isToolsMode }">工具箱</h2>
        </div>
        <div class="u-tab-extends">
            <div v-show="isAiMode" class="u-tab-extends-items">
                <slot name="aiExt"></slot>
            </div>
            <div v-show="isToolsMode" class="u-tab-extends-items">
                <slot name="toolsExt"></slot>
            </div>
        </div>
    </header>
    <main class="u-viewsBd">
        <div v-show="isAiMode" class="tabContent">
            <slot name="ai"></slot>
        </div>
        <div v-show="isToolsMode" class="tabContent">
            <ToolsView></ToolsView>
        </div>
    </main>
</template>
<script setup>
import { ref, computed } from 'vue'
import ToolsView from '../tools/ToolsView.vue'
const activeName = ref('aiTab')

const tabHeanderClick = (tab, event) => {
    activeName.value = tab;
}

const isAiMode = computed(() => activeName.value === 'aiTab');
const isToolsMode = computed(() => activeName.value === 'toolsTab');

</script>
<style scoped>
</style>