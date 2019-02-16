const routes = [
  {
    path: '/',
    name: 'timer',
    component: () => import('../views/Timer.vue')
  },
  {
    path: '/timer/:id',
    name: 'edittimerform',
    component: () => import('../views/TimerForm.vue')
  },
  {
    path: '/timer',
    name: 'addtimerform',
    component: () => import('../views/TimerForm.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue'),
  }
];

export default routes;
