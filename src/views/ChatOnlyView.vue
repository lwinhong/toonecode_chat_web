<script setup>
import { ref, onMounted } from 'vue'
import ChatView from '../components/ChatView.vue'
onMounted(() => {
    console.log("chat only view mounted")
})
</script>

<template>
  <ChatView />
</template>