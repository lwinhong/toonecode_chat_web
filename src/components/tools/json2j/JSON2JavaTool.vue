<script setup>
import { inject, ref } from 'vue'
import ToolView from '../ToolView.vue';
import { Translate2j } from '@/util/translate2j.js'

const $toast = inject('$toast');
const fileUploadInputRef = ref(null);
const onToolClick = (item) => {
    if (data.disabled) {
        $toast.loading('正在生成,请稍候...')
        return;
    }
    fileUploadInputRef.value.click();
}

let data = ref({
    title: 'JSON转Java类',
    subtitle: '根据JSON数据生成Java类',
    name: 'json2java',
    disabled: false
})

const onUploadFileChange = async (e) => {
    const file = e.target.files[0];
    try {
        data.disabled = true;
        $toast.loading('正在生成,请稍候...')

        //文件的方式上传
        // await new Translate2j().excelFile2J(file);
        // this.data.disabled = false;

        //读取text方式
        const reader = new FileReader()
        reader.onload = async () => {
            try {
                let option = { dataType: "json" };
                await new Translate2j().sql2j(reader.result, option, file.name);
            } catch (e) {
                $toast.error("SQL转java失败");
                console.error(e)
            }
            data.disabled = false;
        }
        reader.onerror = () => {
            $toast.error("文件读取失败")
            data.disabled = false;
        }
        // text类型
        reader.readAsText(file, 'utf-8')
    } catch (e) {
        $toast.error("文件格式错误")
        console.error(e)
    }
    finally {
        fileUploadInputRef.value.value = "";
    }
}

</script>
<template>
    <ToolView :data="data" @click="onToolClick">
        <input ref="fileUploadInputRef" type="file" class="fileInput-hide" @change="onUploadFileChange" accept=".json"
            required></input>
    </ToolView>
</template>
<style scoped>
.fileInput-hide {
    display: none;
}
</style>