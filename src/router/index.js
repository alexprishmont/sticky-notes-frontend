import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '@/components/pages/Dashboard.vue';
import AllUserNotes from '@/components/pages/AllUserNotes.vue';
import Login from '@/components/sign/Login.vue';
import Register from '@/components/sign/Register.vue';
import BoardView from '@/components/boards/BoardView.vue';
import MyAccount from '@/components/account/MyAccount.vue';
import NotfoundPage from '@/components/404.vue';

import auth from '@/router/middleware/auth';

import config from '@/config';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      next({ path: '/dashboard' });
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/notes',
    component: AllUserNotes,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/board/:id',
    component: BoardView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/account',
    component: MyAccount,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '*',
    component: NotfoundPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const nextFactory = (context, middleware, index) => {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) {
    return context.next;
  }

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
};

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && localStorage.getItem(config.AUTH_HEADER)) {
    return next({ path: '/dashboard' });
  }

  if (!to.meta.middleware) {
    return next();
  }

  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
  const context = {
    from,
    next,
    router,
    to,
  };

  const nextMiddleware = nextFactory(context, middleware, 1);

  return middleware[0]({ ...context, next: nextMiddleware });
});

export default router;
