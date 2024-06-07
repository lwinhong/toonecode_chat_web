<script setup>
import ToolView from '@/components/tools/ToolView.vue';
import SQL2JavaTool from '@/components/tools/SQL2JavaTool.vue';
import { ref } from 'vue';

const tools = ref([
    // {
    //     title: 'SQL转Java类', subtitle: '根据SQL数据生成Java类型', name: '123123',
    //     click: (item) => {
    //         console.log('123' + item.name + item.title)
    //     }
    // },
    { title: '更多...', subtitle: '敬请期待', name: '123123', tooltip: "敬请期待", disabled: true },

]);

</script>
<template>
    <div class="toolbox-container">
        <div calss="chatbox">
            <div class="toolbox_prompt_box">
                <SQL2JavaTool></SQL2JavaTool>
                <ToolView v-for="(item, i) in tools" :key="i" :data="item"> </ToolView>
            </div>
        </div>
    </div>
</template>
<style scoped>
.toolbox-container {
    flex: 1;
    height: 100%;
    padding: 0 10px 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.toolbox-container .chatbox {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: auto;
}

.toolbox_prompt_box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 165px));
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    row-gap: 10px;
    column-gap: 6px;
    padding-top: 10px;
}
</style>