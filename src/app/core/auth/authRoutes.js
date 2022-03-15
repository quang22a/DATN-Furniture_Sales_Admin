import Login from './containers/Login';
import Auth from './index';

const authRoutes = [
  {
    path: '/auth',
    element: Auth,
    children: [
      {
        path: '',
        redirect: 'login',
      },
      {
        path: 'login',
        element: Login,
      },
    ],
  },
];

export default authRoutes;
