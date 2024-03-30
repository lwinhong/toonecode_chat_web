<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useStore } from './stores/useStore';

onMounted(() => {
  if (!window.vscodeInstance)
    useStore().setVsCodeMode(false);
})
</script>
<template>
  <RouterView />
</template>

<style>
@import "./assets/main.css";
</style>
