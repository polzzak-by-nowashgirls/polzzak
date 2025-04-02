import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import {
  Home,
  Login,
  Map,
  My,
  NotFound,
  Polzzak,
  Register,
  Search,
  Splash,
} from './pages';
import { Add } from './pages/Polzzak';

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/polzzak',
        element: <Polzzak />,
        children: [
          {
            index: true,
            element: <Polzzak />,
          },
          {
            path: 'add',
            element: <Add />,
          },
        ],
      },
      {
        path: '/my',
        element: <My />,
      },
      {
        path: '/splash',
        element: <Splash />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
