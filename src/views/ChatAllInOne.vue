<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/useStore';
import FrameView from './frame/FrameView.vue';
import ChatView from '@/components/chat/ChatView.vue'
import ChatVsCode from './extends/ChatVsCode.vue'
import ChatIdea from './extends/ChatIdea.vue'

import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';
const $bus = inject('$bus')
const ideType = ref("chatOnly");
const store = useStore();

onMounted(() => {
    getIDEType();
})
function getIDEType() {
    const ide = useRoute().query.ide;
    switch (ide) {
        case 'chatOnly':
        case 'idea':
            ideType.value = ide;
            break;
        default:
            try {
                window.acquireVsCodeApi();
                ideType.value = "vscode";
                return;
            } catch (error) {
                console.log("不在vscode内:" + error);
            }
            break;
    }
    console.log(ideType.value);
}

function newChatClick() {
    $bus.emit('executeCmd', { cmd: 'newChat' })
}
</script>

<template>
    <FrameView>
        <template v-slot:ai>
            <ChatView v-if="ideType === 'chatOnly'" :ideType="ideType"></ChatView>
            <ChatVsCode v-else-if="ideType === 'vscode'" :ideType="ideType"></ChatVsCode>
            <ChatIdea v-else-if="ideType === 'idea'" :ideType="ideType"></ChatIdea>
        </template>
        <template v-slot:aiExt>
            <span class="tab-extends-item" title="新的聊天" @click="newChatClick" v-show="!store.chatInProgress">
                <IconPlusSvg></IconPlusSvg>
            </span>
        </template>
    </FrameView>
</template>