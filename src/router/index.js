import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: ':id',
        name: 'profile-viewer',
        component: () => import('../components/profile/ProfileViewer.vue'),
        props: true
      }
    ]
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
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    component: () => import('../views/CreateProfile.vue'),
    children: [
      {
        path: '',
        name: 'personal-info',
        component: () => import('../components/profile/PersonalInformation.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
