import { lazy } from 'react';


const ListRestaurants = lazy(() => import('../pages/Restaurant/List'));

const coreRoutes = [
  
  {
    path: '/restaurants/list',
    title: 'ListRestaurants',
    component: ListRestaurants,
  },
  
];

const routes = [...coreRoutes];
export default routes;
