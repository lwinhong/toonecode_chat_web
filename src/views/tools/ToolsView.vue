<script setup>
import { ref, inject } from 'vue';
import {
    SQL2JavaTool,
    ToolView,
    JSON2JavaTool,
    ColorTransferTool
} from '@/components/tools/index.js';

const $toast = inject('$toast')
function soming(item) {
    $toast.info('敬请期待')
    // import(`@/components/chat/CodeToolBar`).then(m => {
    //     console.log(m)
    // });
}
const tools = ref([
    { title: 'JSON 转 TS', subtitle: '根据JSON数据生成TS类', name: 'json2ts', disabled: true },
    { title: '生成二维码', subtitle: '将URL转为二维码', name: '2qrcode', disabled: true },
    { title: 'Excel 转 JSON', subtitle: '将Excel数据转为JSON', name: 'excel2json', disabled: true },
    { title: '字符串 转 JSON', subtitle: '将字符串解析为JSON', name: 'str2json', disabled: true },
    { title: 'JSON 转 CSV', subtitle: '将JSON数据转为CSV', name: 'json2csv', disabled: true },
    { title: '提取 JSON 数据', subtitle: '重新组织JSON中的数据结构', name: 'getjsondata', disabled: true },
    { title: 'JSON 数据排序', subtitle: '将JSON数据按照自动升序排序', name: 'sortjson', disabled: true },
    { title: '更多...', subtitle: '敬请期待', name: 'more', tooltip: "敬请期待", disabled: true },
]);

</script>
<template>
    <div class="toolbox-container">
        <div calss="chatbox">
            <div class="toolbox_prompt_box">
                <SQL2JavaTool></SQL2JavaTool>
                <JSON2JavaTool></JSON2JavaTool>
                <ColorTransferTool></ColorTransferTool>
                <ToolView v-for="(item, i) in tools" :key="i" :data="item" @click="soming(item)"> </ToolView>
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
    padding-bottom: 13px;
}
</style>