<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/useStore';
import FrameView from './frame/FrameView.vue';
import ChatView from '@/components/chat/ChatView.vue'
import ChatVsCode from './extends/ChatVsCode.vue'

import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';
const $bus = inject('$bus')
const ideType = ref("chatOnly");
const store = useStore();

onMounted(() => {
    getIDEType();
    // useRouter().push('tools' );
})
function getIDEType() {
    const ide = useRoute().query.ide;
    switch (ide) {
        case 'chatOnly':
            ideType.value = ide;
            break;
        case 'idea':
            ideType.value = ide;
            useStore().setIdeaMode(true);
            break;
        default:
            try {
                const vscode = window.acquireVsCodeApi();
                window.vscodeInstance = vscode;
                useStore().setVsCodeMode(vscode ? true : false);
                ideType.value = "vscode";
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
            <ChatView v-if="ideType === 'chatOnly' || ideType === 'idea'"></ChatView>
            <ChatVsCode v-else-if="ideType === 'vscode'"></ChatVsCode>
        </template>
        <template v-slot:aiExt>
            <span class="tab-extends-item" title="新的聊天" @click="newChatClick" v-show="!store.chatInProgress">
                <IconPlusSvg></IconPlusSvg>
            </span>
        </template>
    </FrameView>
</template>