<script setup>
import { ref } from 'vue'
import ToolView from '../ToolView.vue';
import { Translate2j } from '@/util/translate2j.js'
import { ElMessage } from 'element-plus'
import { readFileText } from '@/util/fileUtil.js'

const dialogFormVisible = ref(false)
const fileUploadInputRef = ref(null);
const inputJsonrRef = ref(null);
const doing = ref(false);
const jsonStr = ref("");
const fileName = ref("");

const data = ref({
    title: 'JSON转Java类',
    subtitle: '根据JSON数据生成Java类',
    name: 'json2java',
    disabled: false
})
const demo = ref(`[{
        "table": {
            "name": "md_project",
            "comment": "项目"
        },
        "fields": [{
                "name": "id",
                "dataType": "varchar(64)",
                "comment": ""
            }, {
                "name": "name",
                "dataType": "varchar(255)",
                "comment": "名称"
            }, {
                "name": "sex",
                "dataType": "tinyint",
                "comment": "性别"
            }, {
                "name": "birthday",
                "dataType": "date",
                "comment": "生日"
            }
        ]
    }
]`);

const onToolClick = () => {
    dialogFormVisible.value = true;
    setTimeout(() => {
        inputJsonrRef.value?.focus();
    }, 200);
}
const onUploadFileChange = async (e) => {
    const file = e.target.files[0];
    try {
        //文件的方式上传
        // await new Translate2j().excelFile2J(file);
        // this.data.disabled = false;
        fileName.value = file.name;
        //读取text方式
        readFileText(file).then(async (result) => {
            jsonStr.value = result;
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

const doChanged = async () => {
    data.value.disabled = true;
    doing.value = true;
    try {
        let option = { dataType: "json" };
        await new Translate2j().sql2j(jsonStr.value, option, fileName.value || "json2java.zip");
        dialogFormVisible.value = false;
    } catch (e) {
        ElMessage.error("JSON转java失败");
        console.error(e)
    }
    fileName.value = undefined;
    data.value.disabled = false;
    doing.value = false;
}

const beforeClose = (done) => {
    if (doing.value === true) {
        return;
    }
    done?.();
    jsonStr.value = "";
    doing.value = false;
}
const templateDownload = () => {
    jsonStr.value = demo.value;
}
</script>
<template>
    <ToolView :data="data" @click="onToolClick"> </ToolView>
    <input ref="fileUploadInputRef" type="file" class="fileInput-hide" @change="onUploadFileChange" accept=".json"
        required />
    <el-dialog v-model="dialogFormVisible" title="JSON转Java类" width="95%" destroy-on-close
        :close-on-click-modal="!doing" :before-close="beforeClose">
        <el-input ref="inputJsonrRef" type="textarea" placeholder="请键入JSON字符" :rows="10" v-model="jsonStr"
            :autosize="{ minRows: 10, maxRows: 20 }" :disabled="doing"></el-input>

        <el-row :gutter="20" justify="space-between" class="row-button-container">
            <el-col :span="18">
                <el-button @click="fileUploadInputRef.click()" :disabled="doing" title="打开JSON文件" link>选择文件</el-button>
                <el-button @click="templateDownload" :disabled="doing" link title="加载样例模板">模板</el-button>
            </el-col>
            <el-col :span="6">
                <div class="button-container">
                    <el-button @click="doChanged" :loading="doing" :disabled="doing || !jsonStr">生成</el-button>
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