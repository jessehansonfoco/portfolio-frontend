import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/frontend/Index.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/content/:slug',
      name: 'content_view',
      component: () => import('../views/frontend/Content.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/frontend/Logout.vue'),
    },
    {
        path: '/admin',
        redirect: '/admin/contents',
        meta: { requiresAuth: true },
        component: () => import('../layouts/Admin.vue'),
        children: [
            {
              path: '/admin/content/:id',
              name: 'content_edit',
              component: () => import('../views/admin/ContentEdit.vue'),
              props: true,
            },
            {
              path: '/admin/content',
              name: 'content_create',
              component: () => import('../views/admin/ContentEdit.vue'),
              props: true,
            },
            {
              path: '/admin/contents',
              name: 'content_datatable',
              component: () => import('../views/admin/ContentDatatable.vue'),
              props: true,
            },
        ],
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth ?? false
  const isAuthenticated = authStore.isAuthenticated
  if (requiresAuth && !isAuthenticated) {
    localStorage.setItem('redirectAfterLogin', to.fullPath);
    next('/login');
  } else {
    const redirectAfterLogin = localStorage.getItem('redirectAfterLogin')
    // if (redirectAfterLogin) {
    //   localStorage.setItem('redirectAfterLogin', '');
    //   next(redirectAfterLogin)
    // } else {
      next();
    // }
  }
});

export default router
