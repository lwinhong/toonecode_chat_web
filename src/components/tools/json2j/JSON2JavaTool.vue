<script setup>
import { ref } from 'vue'
import ToolView from '../ToolView.vue';
import { Translate2j } from '@/util/translate2j.js'
import { ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const fileUploadInputRef = ref(null);
const loading = ref(false);
const jsonStr = ref("");
const onToolClick = () => {
    // if (data.disabled) {
    //     ElMessage.warning('正在生成,请稍候...')
    //     return;
    // }
    // fileUploadInputRef.value.click();
    dialogFormVisible.value = true;
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
        // data.value.disabled = true;
        // ElMessage.info('正在生成,请稍候...')

        //文件的方式上传
        // await new Translate2j().excelFile2J(file);
        // this.data.disabled = false;

        //读取text方式
        readFileText(file).then(async (result) => {
            jsonStr.value = result;
            // try {
            //     let option = { dataType: "json" };
            //     await new Translate2j().sql2j(result, option, file.name);
            // } catch (e) {
            //     ElMessage.error("SQL转java失败");
            //     console.error(e)
            // }
            // data.value.disabled = false;
        }).catch(e => {
            ElMessage.error("文件读取失败");
            console.error(e)
        });
    } catch (e) {
        ElMessage.error("文件格式错误")
        console.error(e)
    }
    finally {
        fileUploadInputRef.value.value = "";
    }
}
const readFileText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async () => {
            resolve(reader.result);
        }
        reader.onerror = (e) => {
            reject(e || "文件读取失败")
        }
        // text类型
        reader.readAsText(file, 'utf-8')
    })
}
const doChanged = async () => {
    data.value.disabled = true;
    //const loadingInstance = ElLoading.service({ target: dialogElRef.value })
    loading.value = true;
    try {
        let option = { dataType: "json" };
        await new Translate2j().sql2j(jsonStr.value, option, "json2java.zip");
    } catch (e) {
        ElMessage.error("SQL转java失败");
        console.error(e)
    }
    data.value.disabled = false;
    loading.value = false;
}
const beforeClose = (done) => {
    if (loading.value === true) {
        return;
    }
    done?.();
    jsonStr.value = "";
    loading.value = false;
}

</script>
<template>
    <ToolView :data="data" @click="onToolClick"> </ToolView>
    <input ref="fileUploadInputRef" type="file" class="fileInput-hide" @change="onUploadFileChange" accept=".json"
        required />
    <el-dialog v-loading="loading" v-model="dialogFormVisible" title="JSON转Java类" width="90%" destroy-on-close
        :close-on-click-modal="false" :before-close="beforeClose">
        <el-input type="textarea" placeholder="请键入JSON字符" :rows="10" v-model="jsonStr"
            :autosize="{ minRows: 10, maxRows: 20 }" :disabled="loading"></el-input>

        <el-row :gutter="20" justify="space-between" class="row-button-container">
            <el-col :span="6">
                <el-button @click="fileUploadInputRef.click()" :disabled="loading">选择文件</el-button>
            </el-col>
            <el-col :span="5">
                <div class="button-container">
                    <el-button @click="doChanged" :loading="loading" :disabled="loading || !jsonStr">转换</el-button>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<style scoped>
.fileInput-hide {
    display: none;
}

.row-button-container {
    padding-top: 8px;
}

.row-button-container .button-container {
    display: flex;
    align-items: end;
    flex-flow: column;
}
</style>