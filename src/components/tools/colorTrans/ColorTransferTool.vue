<template>
    <ToolView :data="data" @click="onToolClick">
    </ToolView>
    <el-dialog v-model="dialogFormVisible" title="RGB <--> HEX 转换" width="90%" destroy-on-close>
        <el-form :model="form">
            <el-form-item label="RGB 颜色值" :label-width="formLabelWidth">
                <el-input size="large" v-model="form.rgb" autocomplete="off" />
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <div class="rgb2hex-result-show">
                    <span class="rgb2hex-color-highlight" :style="{ 'background': rgbToHexResult }"></span>
                    <span class="p-3 rgb2hex-color-result">{{ rgbToHexResult }}</span>
                    <el-button @click="copy(rgbToHexResult)" text>复制</el-button>
                </div>
            </el-form-item>
            <el-form-item label="16进制颜色码" :label-width="formLabelWidth">
                <el-input size="large" v-model="form.hex" autocomplete="off" />
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <div class="rgb2hex-result-show">
                    <span class="rgb2hex-color-highlight"
                        :style="[form.hex && { 'background-color': form.hex }]"></span>
                    <span class="p-3 rgb2hex-color-result">{{ hex2rgbResult }}</span>
                    <el-button @click="copy(hex2rgbResult)" text>复制</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue';
import * as clipboard from "clipboard-polyfill";
import ToolView from '../ToolView.vue';
import { ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const formLabelWidth = '100px'
const form = reactive({
    rgb: '106,90,205',
    hex: '#6a5acd',
})
const rgbToHexResult = ref("#6a5acd");
const hex2rgbResult = computed(() => {
    return hexToRgb(form.hex)
});

let data = ref({ title: 'RGB 转 HEX', subtitle: '颜色RGB<-->HEX互转', name: 'rgb-hex', disabled: false })

watch(() => form.rgb, (n) => {
    rgbToHexResult.value = rgbToHex(n);
});

const onToolClick = () => {
    dialogFormVisible.value = true;
}
const copy = (text) => {
    clipboard.writeText(text).then(() => {
        ElMessage.success({
            duration: 1500,
            message: '已复制'
        })
    });
}
/**
 * 将颜色值rgb格式转换为HEX的格式
 * @param {rgb} rgb 需要转换的rgb字符串
 * @return {string}  ;
 */
function rgbToHex(rgb) {
    let colors = rgb.toLowerCase()
        .replace("rgb", "")
        .replace("(", "")
        .replace(")", "")
        .split(",");
    // 转十六进制
    const r = parseInt(colors[0]).toString(16).length === 1 ? "0" + parseInt(colors[0]).toString(16) : parseInt(colors[0]).toString(16)
    const g = parseInt(colors[1]).toString(16).length === 1 ? "0" + parseInt(colors[1]).toString(16) : parseInt(colors[1]).toString(16)
    const b = parseInt(colors[2]).toString(16).length === 1 ? "0" + parseInt(colors[2]).toString(16) : parseInt(colors[2]).toString(16)
    return `#${r}${g}${b}`
}

/**
* 将颜色值HEX格式转换为rgb的格式
* @param {hex} hex 需要转换的rgb字符串
* @return {string}  ;
*/
function hexToRgb(hex) {
    let str = hex.replace("#", "");
    if (str.length % 3) {
        return "格式有误";
    }
    //获取截取的字符长度
    let count = str.length / 3;
    //根据字符串的长度判断是否需要 进行幂次方
    let power = 6 / str.length;
    let r = parseInt("0x" + str.substring(0 * count, 1 * count)) ** power;
    let g = parseInt("0x" + str.substring(1 * count, 2 * count)) ** power;
    let b = parseInt("0x" + str.substring(2 * count)) ** power;
    return `${r}, ${g}, ${b}`;
    //return `rgb(${r}, ${g}, ${b})`;
}


</script>
<style scoped>
.rgb2hex-result-show {
    display: flex;
    /* 启用flex布局 */
    justify-content: center;
    /* 子元素水平居中 */
    align-items: center;
    /* 子元素垂直居中 */
    flex-wrap: wrap;
}

.rgb2hex-color-highlight {
    display: inline-block;
    line-height: 35px;
    width: 60px;
    height: 35px;
    border: 1px solid rgb(128 128 128 / 28%)
}

.rgb2hex-color-result {
    width: 100px;
}
</style>