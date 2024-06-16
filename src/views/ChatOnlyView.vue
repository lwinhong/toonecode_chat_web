<script setup>
import { onMounted } from 'vue'
import FrameView from './frame/FrameView.vue';
import ChatView from '@/components/chat/ChatView.vue'
import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';
import { useStore }  from '@/stores/useStore';
const store = useStore();

onMounted(() => {
  console.log("chat only view mounted")
})
function newChatClick() {
  this.$bus.emit('executeCmd', { cmd: 'newChat' })
}
</script>

<template>
  <FrameView>
    <template v-slot:ai>
      <ChatView></ChatView>
    </template>
    <template v-slot:aiExt>
      <span class="tab-extends-item" title="新的聊天" @click="newChatClick" v-show="!store.chatInProgress">
        <IconPlusSvg></IconPlusSvg>
      </span>
    </template>
  </FrameView>
</template>