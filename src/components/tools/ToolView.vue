<script setup>
const props = defineProps({
    data: {
        title: String,
        subtitle: String,
        icon: String,
        color: String,
        bgcolor: String,
        click: Function,
        disabled: Boolean,
        tooltip: String
    }
});
const emit = defineEmits(['click']);
function handleClick(e) {
    // if (props.data.disabled)
    //     return;
    //e.preventDefault();
    props.data.click?.(props.data, e);
    emit('click', props.data, e);
}
</script>
<template>
    <div class="prompt_block" :class="{ 'prompt_block_disabled': props.data.disabled }" @click="handleClick"
        :title="props.data.tooltip || (props.data.title + '\n' + props.data.subtitle)">
        <div class="toolbox_prompt_title" :class="{ 'toolbox_prompt_title_disabled': props.data.disabled }">{{
            props.data.title }}</div>
        <div class="toolbox_prompt_subtitle" :class="{ 'toolbox_prompt_title_disabled': props.data.disabled }">{{
            props.data.subtitle }}</div>
        <slot></slot>
    </div>
</template>
<style scoped>
.prompt_block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    max-width: 160px;
    border-radius: 4px;
    background: var(--tc-chat-card-content-bg);
    cursor: pointer;
    border: 1px solid transparent;
}

.prompt_block_disabled {
    cursor: default !important;
}

.prompt_block:hover {
    background: var(--vscode-button-secondaryHoverBackground) !important;
}

.toolbox_prompt_title {
    margin: 8px 0;
    width: 100%;
    color: var(--vscode-editor-foreground);
    font-size: var(--vscode-font-size, "12px");
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.toolbox_prompt_title_disabled {
    color: rgba(128, 128, 128, .8) !important;
}

.toolbox_prompt_subtitle {
    width: 100%;
    color: var(--vscode-button-secondaryForeground);
    font-size: calc(var(--vscode-font-size) - 2px);
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>