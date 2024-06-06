<script setup>
import ChatVsCode from './extends/ChatVsCode.vue'
import FrameView from './frame/FrameView.vue';
</script>
<template>
    <FrameView>
      <template v-slot:ai>
        <ChatVsCode></ChatVsCode>
      </template>
      <!-- <template v-slot="tools">
      </template> -->
    </FrameView>
  </template>