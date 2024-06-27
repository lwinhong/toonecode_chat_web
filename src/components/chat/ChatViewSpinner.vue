<script setup>
const emit = defineEmits(['stopClick'])
import { CircleClose } from '@element-plus/icons-vue'

const onStopClick = () => {
    emit('stopClick');
}
const props = defineProps(
    { "showStopButton": Boolean })

</script>

<template>
    <div class="pl-4 pt-2 flex items-center" data-license="isc-gnc">
        <div class="typing">正在思考</div>
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <button id="stop-button" type="button" class="btn btn-primary flex items-end p-1 pr-2 rounded-md ml-5"
            v-show="props.showStopButton" @click="onStopClick">
            <el-icon :size="14" style="vertical-align: middle;margin-right: 8px">
                <CircleClose />
            </el-icon>
            停止</button>
    </div>
</template>