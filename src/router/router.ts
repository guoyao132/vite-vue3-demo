import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../App.vue'),
    },
    {
      path: '/login',
      component: () => import('../view/login/index.vue'),
    },
  ],
})

export default router;
