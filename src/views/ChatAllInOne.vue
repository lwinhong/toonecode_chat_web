<script setup>
import { onMounted, ref, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/useStore';
import { util } from '@/util';

import FrameView from './frame/FrameView.vue';
import ChatView from '@/components/chat/ChatViewEl.vue'
import ChatVsCode from './extends/ChatVsCode.vue'

import { Plus, More, Setting, Select } from '@element-plus/icons-vue'
const $bus = inject('$bus')
const ideType = ref("chatOnly");
const store = useStore();
const moreMenuOption = ref({
    show: false,
    theme: "dark",
    option: {
        zIndex: 300,
        //minWidth: 130,
        x: 500,
        y: 200
    }
})

onMounted(() => {
    getIDEType();
})
const getIDEType = () => {
    const ide = useRoute().query.ide;
    switch (ide) {
        case 'chatOnly':
            ideType.value = ide;
            break;
        case 'idea':
            ideType.value = ide;
            //store.setIdeaMode(true);
            break;
        default:
            try {
                const vscode = window.acquireVsCodeApi();
                window.vscodeInstance = vscode;
                //store.setVsCodeMode(vscode ? true : false);
                ideType.value = "vscode";
            } catch (error) {
                console.log("不在vscode内:" + error);
            }
            break;
    }
    store.setIdeType(ideType.value);

    if (store.isVsCodeMode) {
        document.documentElement.style.setProperty('--tc-caht-bg', 'transparent');
    } else if (store.isChatOnlyMode) {
        document.getElementById("app")?.classList.add("chat-box-600");
    }
}

const newChatClick = () => {
    $bus.emit('executeCmd', { cmd: 'newChat' })
}
const moreChatClick = (e) => {
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    moreMenuOption.value.option.x = rect.right;
    moreMenuOption.value.option.y = rect.top + rect.height + 6;
    moreMenuOption.value.show = true;
}
const settingClick = () => util.openSetting();
const themeClick = (theme) => {
    store.setTheme(window.changeTheme(theme));
};
</script>

<template>
    <FrameView>
        <template v-slot:ai>
            <ChatView v-if="store.isChatOnlyMode || store.isIdeaMode"></ChatView>
            <ChatVsCode v-else-if="store.isVsCodeMode"></ChatVsCode>
        </template>
        <template v-slot:aiExt>
            <span class="tab-extends-item" title="新的对话" @click="newChatClick" v-show="!store.chatInProgress">
                <el-icon>
                    <Plus />
                </el-icon>
            </span>
            <span class="tab-extends-item" title="更多" @click="moreChatClick"
                v-show="store.isChatOnlyMode">
                <el-icon>
                    <More />
                </el-icon>
                <context-menu v-model:show="moreMenuOption.show" :options="moreMenuOption.option">
                    <context-menu-item label="设置" @click="settingClick" v-if="store.isInCodeIDE">
                        <template #icon>
                            <el-icon>
                                <Setting />
                            </el-icon>
                        </template>
                    </context-menu-item>
                    <context-menu-group label="主题" v-if="store.isChatOnlyMode">
                        <context-menu-item label="深色" @click="themeClick('dark')">
                            <template #icon v-if="store.theme === 'dark'">
                                <el-icon><Select /></el-icon>
                            </template>
                        </context-menu-item>
                        <context-menu-item label="浅色" @click="themeClick('light')">
                            <template #icon v-if="store.theme === 'light'">
                                <el-icon><Select /></el-icon>
                            </template>
                        </context-menu-item>
                    </context-menu-group>
                </context-menu>
            </span>
        </template>
    </FrameView>
</template>