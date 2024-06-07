<script>
import SQL2JavaTool from './SQL2JavaTool.js';
export default SQL2JavaTool
</script>
<template>
    <ToolView :data="data">
        <input ref="fileUploadInputRef" type="file" class="fileInput-hide" id="file-upload-input"
            @change="onUploadFileChange" accept=".sql" required></input>
        <Message ref="message"></Message>
    </ToolView>
</template>
<style scoped>
.fileInput-hide {
    display: none;
}
</style>