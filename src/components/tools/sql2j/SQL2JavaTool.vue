<script setup>
import { ref } from 'vue'
import ToolView from '../ToolView.vue';
import { Translate2j } from '@/util/translate2j.js'
import { ElMessage } from 'element-plus'
import { readFileText } from '@/util/fileUtil.js'

const dialogFormVisible = ref(false)
const fileUploadInputRef = ref(null);
const acceptExt = ref(".sql")
const inputSqlRef = ref(null);
const doing = ref(false);
const sqlStr = ref("");
const fileName = ref("");

const defaultSqlType = "mysql";
const sqlTypeOption = ref([defaultSqlType, "oracle", "postgresql", "sqlserver"]);
const sqlType = ref(defaultSqlType);

const data = ref({
    title: 'SQL转Java类',
    subtitle: '根据SQL脚本生成Java类',
    name: 'sql2java',
    //click: onToolClick,
    disabled: false
})
const demo = ref(`CREATE TABLE md_template_table  (
  id varchar(64) NOT NULL,
  project_id varchar(64),
  org_name varchar(255),
  leader varchar(20),
  duty varchar(20),
  phone varchar(20) COMMENT '手机号码',
  remark varchar(255) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) COMMENT= '模板样例表';`);

const onToolClick = () => {
    dialogFormVisible.value = true;
    setTimeout(() => {
        inputSqlRef.value?.focus();
    }, 200);
}

const onUploadFileChange = async (e) => {
    const file = e.target.files[0];
    try {
        //文件的方式上传
        //await new Translate2j().excelFile2J(file, option);
        // this.data.disabled = false;
        fileName.value = file.name;

        //读取text方式
        readFileText(file).then(async (result) => {
            sqlStr.value = result?.trim();
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

const doGenerate = async () => {
    data.value.disabled = true;
    doing.value = true;
    const options = { dbType: sqlType.value || defaultSqlType, dataType: "sql" };
    try {
        await new Translate2j().sql2j(sqlStr.value, options, fileName.value || "sql2java.zip");
        dialogFormVisible.value = false;
    } catch (e) {
        ElMessage.error("SQL转java失败");
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
    sqlStr.value = "";
    doing.value = false;
}
const templateDownload = () => {
    sqlStr.value = demo.value;
    sqlType.value = defaultSqlType;
}
</script>
<template>
    <ToolView :data="data" @click="onToolClick"> </ToolView>
    <input ref="fileUploadInputRef" type="file" class="fileInput-hide" @change="onUploadFileChange" :accept="acceptExt"
        required />
    <el-dialog v-model="dialogFormVisible" title="SQL转Java类" width="95%" destroy-on-close :close-on-click-modal="!doing"
        :before-close="beforeClose">

        <el-form>
            <el-form-item label="数据库">
                <el-select v-model="sqlType" placeholder="Select">
                    <el-option v-for="item in sqlTypeOption" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input ref="inputSqlRef" type="textarea" placeholder="请键入SQL脚本或选择文件" :rows="10" v-model="sqlStr"
                    :autosize="{ minRows: 10, maxRows: 20 }" :disabled="doing"></el-input>
            </el-form-item>
        </el-form>
        <el-row :gutter="20" justify="space-between" class="row-button-container">
            <el-col :span="18">
                <el-button @click="fileUploadInputRef.click()" :disabled="doing" title="打开JSON文件" link>选择文件</el-button>
                <el-button @click="templateDownload" :disabled="doing" link title="加载样例模板">模板</el-button>
            </el-col>
            <el-col :span="6">
                <div class="button-container">
                    <el-button @click="doGenerate" :loading="doing" :disabled="doing || !sqlStr" plain
                        type="primary">生成</el-button>
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
    padding-top: 0px;
}

.row-button-container .button-container {
    display: flex;
    align-items: end;
    flex-flow: column;
}
</style>