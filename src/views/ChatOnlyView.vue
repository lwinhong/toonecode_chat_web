<script setup>
import { onMounted } from 'vue'
import FrameView from './frame/FrameView.vue';
import ChatView from '../components/ChatView.vue'

onMounted(() => {
  console.log("chat only view mounted")
})
</script>

<template>
  <FrameView>
    <template v-slot:ai>
      <ChatView></ChatView>
    </template>
    <!-- <template v-slot="tools">
    </template> -->
  </FrameView>
</template>