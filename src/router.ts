/** Vue Router Configure */
import { createRouter, type Router, type RouteRecordRaw } from '@logue/vue2-helpers/vue-router';

import DashboardView from '@/views/DashboardView.vue';

/** Router Configure */
const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/datasource',
    name: 'Datasource',
    component: async () => await import('@/views/DatasourceView.vue'),
  },
  {
    path: '/process',
    name: 'Process',
    component: async () => await import('@/views/ProcessView.vue'),
  },
  {
    path: '/detector',
    name: 'Detector',
    component: async () => await import('@/views/DetectorView.vue'),
  },
  {
    path: '*',
    redirect: '/dashboard',
  },
];

/** Vue Router */
const router = createRouter({
  base: import.meta.env.BASE_URL,
  mode: 'history', // abstract, hash, history
  routes,
});

export default router as Router;
