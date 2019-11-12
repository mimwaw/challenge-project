import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Articles from '../views/Articles.vue';
import NewArticle from '../views/NewArticle.vue';
import ArticleParent from '../views/ArticleParent.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/articles',
    component: ArticleParent,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'Articles',
        path: '',
        component: Articles
      },
      {
        path: 'create',
        component: NewArticle,
      },
      {
        path: 'page/:page',
        component: Articles,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['login/isAuthenticated']) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
