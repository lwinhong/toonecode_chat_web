<script setup>
import { RouterView } from 'vue-router';
// import { onMounted } from 'vue';
// import { useStore } from './stores/useStore';

// onMounted(() => {
//   try {
//     const vscode = window.acquireVsCodeApi();
//     window.vscodeInstance = vscode;
//     useStore().setVsCodeMode(vscode ? true : false);
//   } catch (error) {
//     console.log("不在vscode内")
//   }

//   try {
//     var params = new URLSearchParams(window.location.search);
//     if (params.get("idea") === "1") {
//       useStore().setIdeaMode(true);
//       console.log("在idea内")
//     }
//   } catch (error) {
//     console.log("不在idea内")
//   }
// })
</script>
<template>
  <RouterView />
</template>

<style>
@import "./assets/theme-dark.css";
@import "./assets/theme-light.css";
@import "./assets/main.css";
</style>
