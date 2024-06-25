<script setup>
import ToolView from '../ToolView.vue';
import qrcode from "qrcode";
import { ref, watch, onMounted, nextTick } from 'vue';
import { util } from "@/util/index"
import { Picture as IconPicture } from '@element-plus/icons-vue'

const simple = "https://www.toone.com.cn";
const dialogFormVisible = ref(false)
const inputQrcoderRef = ref(null);
const qrcodeResult = ref(null)
const qrcodeStr = ref(simple)
const data = ref({ title: '生成二维码', subtitle: '将文本转为二维码', name: '2qrcode' })

const createQrCode = async (qrcodeString) => {
    if (qrcodeString) {
        qrcodeResult.value = await qrcode.toDataURL(qrcodeString, {
            margin: 1/*, width: 300, darkcolor: "#202020"*/
        });
    } else {
        qrcodeResult.value = ""
    }
};
const downloadQrCode = () => {
    util.downloadIamge(qrcodeResult.value, "二维码.png")
}

onMounted(() => {
    qrcodeStr.value = simple
    createQrCode(qrcodeStr.value)
})

watch(qrcodeStr, (n) => {
    util.debounce(createQrCode, n, 300);
});

const onToolClick = () => {
    dialogFormVisible.value = true;
    setTimeout(() => {
        inputQrcoderRef.value.focus();
    }, 200);
}
const beforeClose = (done) => {
    done?.();
    qrcodeStr.value = "";
    qrcodeResult.value = "";
}
</script>
<template>
    <ToolView :data="data" @click="onToolClick">
    </ToolView>
    <el-dialog v-model="dialogFormVisible" title="生成二维码" width="95%" destroy-on-close :before-close="beforeClose">
        <el-input ref="inputQrcoderRef" type="textarea" placeholder="请键入文本" :rows="5" v-model="qrcodeStr"
            :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
        <div class="qrcode-image">
            <div class="block" :class="{ 'block-no-img': !qrcodeResult }">
                <el-image :src="qrcodeResult" fit="cover">
                    <template #error>
                        <div class="no-img">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div>
            <el-button type='primary' link @click="downloadQrCode" :disabled="!qrcodeResult"
                title="点击下载二维码">下载二维码</el-button>
        </div>
    </el-dialog>
</template>
<style scoped>
.qrcode-image {
    display: flex;
    align-items: flex-end;
    padding: 8px 0;
    gap: 8px;
    flex-wrap: wrap;
}

.qrcode-image .block {

    /* text-align: center; */
    display: inline-block;
    box-sizing: border-box;
    vertical-align: bottom;
    border: 1px solid var(--el-border-color);
    /* background: var(--el-fill-color-light); */
    color: var(--el-text-color-secondary);
    border-radius: 3px;
    padding: 4px 2px 0px 2px;
    /* width: 100%; */
}

.qrcode-image .block-no-img {
    background: var(--el-fill-color-light);
}

.qrcode-image .el-image {
    /* padding: 0 5px; */

    max-width: 300px;
    max-height: 300px;
    min-width: 100px;
    min-height: 100px;
    /* width: 100%;
    height: 300px; */
}

.qrcode-image .el-image .no-img {
    align-items: center;
    justify-content: center;
    height: 100px;
    display: flex;
}
</style>