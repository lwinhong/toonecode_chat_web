<script setup>
import { RouterView } from 'vue-router';
import { useStore } from '@/stores/useStore';
import { onMounted } from 'vue';

onMounted(() => {
  const store = useStore();
  store.setTheme(window.changeTheme(localStorage.getItem('codeTheme') || store.theme));
})
</script>
<template>
  <RouterView />
</template>
<style>
@import "./assets/theme-dark.css";
@import "./assets/theme-light.css";
@import "./assets/main.css";
</style>
