import Vue from 'vue';
import Router from 'vue-router';
import Authorization from '../components/Authorization/Authorization';
import Page from '../components/Page/Page';
import ChooseCategories from '../components/ChooseCategories/ChooseCategories';
import ProfileCabinet from '../components/ProfileCabinet/ProfileCabinet';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/authorization',
      redirect: '/authorization/sign-in',
      name: 'Authorization',
      component: Authorization,
      children: [
        {
          path: 'sign-in',
          component: Authorization,
        },
        {
          path: 'sign-up',
          component: Authorization,
        },
      ],
    },
    {
      path: '/categories',
      name: 'ChooseCategories',
      component: ChooseCategories,
      children: [
        {
          path: '/categories/:name',
          component: Page,
        },
      ],
    },
    {
      path: '/profile',
      name: 'ProfileCabinet',
      component: ProfileCabinet,
    },
    {
      path: '*',
      redirect: '/authorization/sign-in',
    },
  ],
});
