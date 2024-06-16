<script setup>
import ChatIdea from './extends/ChatIdea.vue'
import FrameView from './frame/FrameView.vue';
import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';
</script>
<template>
  <FrameView>
    <template v-slot:ai>
      <ChatIdea />
    </template>
    <template v-slot:aiExt>
      <span class="tab-extends-item" title="新的聊天">
        <IconPlusSvg></IconPlusSvg>
      </span>
    </template>
  </FrameView>
</template>