import Vue from 'vue';
import VueRouter from 'vue-router';
// import stor from 'module';

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    next('/');
    return;
  }
  next();
};

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'profile',
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
        path: 'login',
        name: 'login',
        component: () => import('../components/authentication/Login.vue'),
        props: true
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../components/authentication/Register.vue'),
        props: true
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/Account.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: 'change-name',
        name: 'change-name',
        component: () => import('../components/account/ChangeAccountName.vue')
      },
      {
        path: 'change-email',
        name: 'change-email',
        component: () => import('../components/account/ChangeAccountEmail.vue')
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('../components/account/ChangeAccountPassword.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
