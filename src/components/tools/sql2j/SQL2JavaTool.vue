<script setup>
import {  ref } from 'vue'
import ToolView from '../ToolView.vue';
import { Translate2j } from '@/util/translate2j.js'
import { ElMessage } from 'element-plus'

const fileUploadInputRef = ref(null);
const acceptExt = ref(".sql")

const onToolClick = () => {
    if (data.value.disabled) {
        ElMessage.warning('正在生成,请稍候...')
        return;
    }
    fileUploadInputRef.value.click();
}

let data = ref({
    title: 'SQL转Java类',
    subtitle: '根据SQL脚本生成Java类',
    name: 'sql2java',
    //click: onToolClick,
    disabled: false
})

const onUploadFileChange = async (e) => {
    const file = e.target.files[0];
    try {
        data.value.disabled = true;
        ElMessage.info('正在生成,请稍候...')

        const options = { dbType: 'mysql' };
        //文件的方式上传
        //await new Translate2j().excelFile2J(file, option);
        // this.data.disabled = false;

        //读取text方式
        const reader = new FileReader()
        reader.onload = async () => {
            try {
                await new Translate2j().sql2j(reader.result, options, file.name);
            } catch (e) {
                ElMessage.error("SQL转java失败");
                console.error(e)
            }
            data.value.disabled = false;
        }
        reader.onerror = () => {
            ElMessage.error("文件读取失败")
            data.value.disabled = false;
        }
        // text类型
        reader.readAsText(file, 'utf-8')
    } catch (e) {
        ElMessage.error("文件格式错误")
        console.error(e)
    }
    finally {
        fileUploadInputRef.value.value = "";
    }
}

</script>
<template>
    <ToolView :data="data" @click="onToolClick"> </ToolView>
    <input ref="fileUploadInputRef" type="file" class="fileInput-hide" @change="onUploadFileChange" :accept="acceptExt"
        required/>
</template>
<style scoped>
.fileInput-hide {
    display: none;
}
</style>