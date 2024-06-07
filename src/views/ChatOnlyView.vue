<script setup>
import { onMounted } from 'vue'
import FrameView from './frame/FrameView.vue';
import ChatView from '@/components/chat/ChatView.vue'
import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';
onMounted(() => {
  console.log("chat only view mounted")
})
</script>

<template>
  <FrameView>
    <template v-slot:ai>
      <ChatView></ChatView>
    </template>
    <template v-slot:aiExt>
      <IconPlusSvg></IconPlusSvg>
    </template>
    <!-- <template v-slot="tools">
    </template> -->
  </FrameView>
</template>