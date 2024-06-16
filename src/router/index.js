import { createRouter, createWebHashHistory } from 'vue-router'
import ChatOnlyView from '@/views/ChatOnlyView.vue';
//import HomeView from '@/views/HomeView.vue';

import ChatVsCodeView from '@/views/ChatVsCodeView.vue';
import ChatIdeaView from '@/views/ChatIdeaView.vue';
import ChatAllInOne from '@/views/ChatAllInOne.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'chat',
    component: ChatAllInOne
  },
  {
    path: '/chat',
    name: 'chat only view',
    component: ChatOnlyView
  },
  {
    path: '/vscode',
    name: 'vscode view',
    component: ChatVsCodeView
  },
  {
    path: '/chatAllInOne',
    name: 'chatAllInOne',
    component: ChatAllInOne
  },
  {
    path: '/idea',
    name: 'idea view',
    component: ChatIdeaView
  }]
})

export default router
