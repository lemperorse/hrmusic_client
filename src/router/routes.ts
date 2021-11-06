import { RouteConfig } from 'vue-router';
 
const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/RootLayout.vue'),
    children: [
      { path: '', component: () => import('pages/root/Login.vue') },
      { path: '/register', component: () => import('pages/root/Register.vue') }
    ]
  },
  {
    path: '/app/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home/', component: () => import('pages/app/Home.vue') },
      { path: 'connect/', component: () => import('pages/app/ConnectHR.vue') },
      { path: 'goal/', component: () => import('pages/app/Goal.vue') },
      { path: 'pace/', component: () => import('src/pages/app/PaceZone.vue') },
      { path: 'calendar/', component: () => import('pages/app/TrainingCalendar.vue') },
      { path: 'calendar-preview/', component: () => import('pages/app/TrainingPreview.vue') },
      { path: 'about/', component: () => import('pages/app/About.vue') },
      { path: 'profile/', component: () => import('pages/app/Profile.vue') },
      { path: 'preview/', component: () => import('pages/app/Preview.vue') },
      { path: 'setting/', component: () => import('pages/app/Setting.vue') },
      { path: 'running/', component: () => import('pages/app/Running.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
