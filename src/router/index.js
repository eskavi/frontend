import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.state.user.email && store.state.user.token) {
        next('/configurator');
      } else {
        next();
      }
    },
  },
  {
    path: '/modules',
    name: 'Modules',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "modules" */ '../views/ModulesOverview.vue'),
  },
  {
    path: '/configurator',
    name: 'Configurator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "configurator" */ '../views/Configurator.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "configurator" */ '../views/Account.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.email || !store.state.user.token) {
        store.dispatch('sendActionResponse', 'You need to be logged in to view this page.');
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/editImp',
    name: 'Edit Implementation',
    props: true,
    component: () => import('../views/Edit.vue'),
  },
  {
    path: '/impcreator',
    name: 'Create Moduleimplementation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "configurator" */ '../views/CreateModuleImp.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.email || !store.state.user.token) {
        store.dispatch('sendActionResponse', 'You need to be logged in to view this page.');
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/admin_dashboard',
    name: 'Admin Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "configurator" */ '../views/AdminDashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (
        store.state.user.userLevel !== 'ADMINISTRATOR' ||
        !store.state.user.email ||
        !store.state.user.token
      ) {
        store.dispatch('sendActionResponse', 'You need to be administrator to access this page.');
        next('/');
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
