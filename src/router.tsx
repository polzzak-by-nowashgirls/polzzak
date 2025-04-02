import { createBrowserRouter } from 'react-router-dom';

import Edit from '@/pages/My/Edit/Edit';
import Email from '@/pages/My/Edit/Email/Email';
import NickName from '@/pages/My/Edit/NickName/NickName';
import Password from '@/pages/My/Edit/Password/Password';
import PhoneNumber from '@/pages/My/Edit/PhoneNumber/PhoneNumber';

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
      },
      {
        path: '/my',
        element: <My />,
      },
      {
        path: '/my/edit',
        element: <Edit />,
      },
      {
        path: '/my/edit/nickname',
        element: <NickName />,
      },
      {
        path: '/my/edit/password',
        element: <Password />,
      },
      {
        path: '/my/edit/phone-number',
        element: <PhoneNumber />,
      },
      {
        path: '/my/edit/email',
        element: <Email />,
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
