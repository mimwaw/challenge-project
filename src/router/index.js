import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Articles from '../views/Articles.vue';
import NewArticle from '../views/NewArticle.vue';
import EditArticle from '../views/EditArticle.vue';
import ArticleParent from '../views/ArticleParent.vue';
import NotFound from '../views/NotFound.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/articles',
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
    path: '/articles',
    component: ArticleParent,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'Articles',
        path: '',
        component: Articles,
      },
      {
        path: 'create',
        component: NewArticle,
      },
      {
        path: 'page/:page',
        component: Articles,
      },
      {
        path: 'edit/:slug',
        component: EditArticle,
      },
    ],
  },
  { path: '/404', component: NotFound },
  { path: '*', redirect: '/404' },
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
