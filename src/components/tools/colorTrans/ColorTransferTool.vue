<template>
    <ToolView :data="data" @click="onToolClick">

    </ToolView>
</template>
<script setup>
import { ref, inject } from 'vue';
import ToolView from '../ToolView.vue';
const $toast = inject('$toast');

let data = ref({ title: 'RGB 转 HEX', subtitle: '颜色RGB<-->HEX互转', name: 'rgb2hex', disabled: true })
const onToolClick = (item) => {
    $toast.info('敬请期待')
}
/**
         * 将颜色值rgb格式转换为HEX的格式
         * @param {rgb} rgb 需要转换的rgb字符串
         * @return {string}  ;
         */
function rgbToHex(rgb) {
    let arr = rgb
        .replace("rgb", "")
        .replace("(", "")
        .replace(")", "")
        .split(",");
    // 转十六进制
    let h = parseInt(arr[0]).toString(16);
    let e = parseInt(arr[1]).toString(16);
    let x = parseInt(arr[2]).toString(16);
    return "#" + h + e + x;
}

/**
        * 将颜色值HEX格式转换为rgb的格式
        * @param {hex} hex 需要转换的rgb字符串
        * @return {string}  ;
        */
function hexToRgb(hex) {
    let str = hex.replace("#", "");
    if (str.length % 3) {
        return "hex格式不正确！";
    }
    //获取截取的字符长度
    let count = str.length / 3;
    //根据字符串的长度判断是否需要 进行幂次方
    let power = 6 / str.length;
    let r = parseInt("0x" + str.substring(0 * count, 1 * count)) ** power;
    let g = parseInt("0x" + str.substring(1 * count, 2 * count)) ** power;
    let b = parseInt("0x" + str.substring(2 * count)) ** power;

    return `rgb(${r}, ${g}, ${b})`;
}


</script>