<script setup>
import ChatIdea from './extends/ChatIdea.vue'
import FrameView from './frame/FrameView.vue';
</script>
<template>
  <FrameView>
    <template v-slot:ai>
      <ChatIdea />
    </template>
    <!-- <template v-slot="tools">
      </template> -->
  </FrameView>
</template>