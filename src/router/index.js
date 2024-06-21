import { createRouter, createWebHashHistory } from 'vue-router'

import ChatAllInOne from '@/views/ChatAllInOne.vue';
// import ToolHandlerContainer from '@/views/tools/ToolHandlerContainer.vue';
// import ToolsView from '@/views/tools/ToolsView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'chat',
    component: ChatAllInOne,
    // children: [
    //   {
    //     path: '/tools',
    //     component: ToolsView
    //   },
    //   {
    //     path: '/tool',
    //     component: ToolHandlerContainer
    //   }
    // ]
  },
  ]
})

export default router
