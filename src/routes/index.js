import Vue from 'vue';
import Router from 'vue-router';
import Producao from '@/components/Producao';
import Estoque from '@/components/Estoque';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Producao',
      component: Producao,
    },
    {
      path: '/estoque',
      name: 'Estoque',
      component: Estoque,
    },
  ],
});
