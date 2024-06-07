<script setup>
import ToolView from './ToolView.vue';
import { ref } from 'vue';

let fileUploadInputRef = ref();
const data = ref({
    title: 'SQL转Java类', subtitle: '根据SQL数据生成Java类型', name: 'sql2java',
    click: (item) => {
        onUploadFile();
    }
})

function onUploadFile() {
    fileUploadInputRef.value.click();
}
function onUploadFileChange(e) {
    console.log(e.target.files[0].name)
}
</script>
<template>
    <ToolView :data="data">
        <input ref="fileUploadInputRef" type="file" class="fileInput-hide" id="file-upload-input"
            @change="onUploadFileChange" accept=".sql" required></input>
    </ToolView>

</template>
<style scoped>
.fileInput-hide {
    display: none;
}
</style>