<template>
  <ChatView ref="chatViewRef"></ChatView>
</template>
<script setup>
import { useStore } from '../stores/useStore';
import { ref, onMounted } from 'vue'

import ChatView from '../components/ChatView.vue'

let chatViewRef = ref();
onMounted(() => {
  console.log("idea view mounted")
  useStore().setIdeaMode(true);
  // try {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.get("idea") === "1") {
  //     useStore().setIdeaMode(true);
  //     console.log("在idea内")
  //   }
  // } catch (error) {
  //   console.log("不在idea内")
  // }
})
</script>