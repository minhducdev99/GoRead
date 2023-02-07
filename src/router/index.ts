import { BLANK_LAYOUT, DEFAULT_LAYOUT, DASH_BOARD_LAYOUT } from '@/contants';
import { auth } from '@/middlewares/auth';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import AdminBlogPage from '@/views/AdminBlogsPage.vue';
import AdminCategoriesPage from '@/views/AdminCategoriesPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      layout: BLANK_LAYOUT,
      bodyClass: '',
    }
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      layout: DEFAULT_LAYOUT,
    },
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('@/views/BlogsPage.vue'),
    meta: {
      layout: DEFAULT_LAYOUT,
    },
    children: [
      {
        path: ':id',
        name: 'blog-detail',
        component: () => import('@/views/BlogDetailPage.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: DASH_BOARD_LAYOUT,
      middleware: [auth],
    },
    children: [
      {
        path: 'blogs',
        name: 'AdminBlogsPage',
        component: AdminBlogPage,
      },
      {
        path: 'categories',
        name: 'AdminCategoriesPage',
        component: AdminCategoriesPage
      }
    ]
  },

  {
    path: '/404', name: '404', component: NotFoundPage, meta: {
      layout: BLANK_LAYOUT,
      middleware: [auth],
    },
  },
  { path: '/:catchAll(.*)', redirect: '/404' }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function nextFactory(context: any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters: any) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return next();
});

export default router;
