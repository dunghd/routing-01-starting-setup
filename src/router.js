import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UserList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamFooter from './pages/TeamFooter.vue';
import UserFooter from './pages/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      path: '/teams',
      components: { default: TeamsList, footer: TeamFooter },
      // alias: '/',
      children: [
        {
          path: '/teams/:teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: { default: UserList, footer: UserFooter },
      beforeEnter: (to, from, next) => {
        console.log(`user beforeEnter`);
        console.log(to, from);
        next();
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`Global beforeEach`);
  console.log(to, from);

  next(true);
});

export default router;
