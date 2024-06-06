import { createRouter, createWebHashHistory } from 'vue-router'
// import ChatOnlyView from '@/views/ChatOnlyView.vue';
//import HomeView from '@/views/HomeView.vue';

import ChatVsCodeView from '@/views/ChatVsCodeView.vue';
// import ChatIdeaView from '@/views/ChatIdeaView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'default vscode view',
    component: ChatVsCodeView
  },
  {
    path: '/chat',
    name: 'chat only view',
    component: () => import('@/views/ChatOnlyView.vue')
  },
  {
    path: '/vscode',
    name: 'vscode view',
    component: ChatVsCodeView
  },
  {
    path: '/idea',
    name: 'idea view',
    component: () => import('@/views/ChatIdeaView.vue')
  }]
})

export default router
