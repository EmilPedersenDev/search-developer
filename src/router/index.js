import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import('../views/Authentication.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('../components/authentication/Register.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/authentication/Login.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
