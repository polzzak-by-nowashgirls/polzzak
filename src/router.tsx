import { createBrowserRouter, Navigate } from 'react-router-dom';

import ViewDetails from '@/pages/Contents/ViewDetails';
import { Edit, Email, NickName, Password, PhoneNumber } from '@/pages/My/Edit';
import { Add, Schedule } from '@/pages/Polzzak';
import { StepPage } from '@/pages/Register';

import RootLayout from './layouts/RootLayout';
import {
  Contents,
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
        children: [
          { index: true, element: <Navigate to="1" replace /> },
          { path: ':step', element: <StepPage /> },
        ],
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
          {
            path: ':id',
            element: <Schedule />,
          },
        ],
      },
      {
        path: '/my',
        element: <My />,
        children: [
          {
            index: true,
            element: <My />,
          },
          {
            path: 'edit',
            element: <Edit />,
            children: [
              {
                index: true,
                element: <Edit />,
              },
              {
                path: 'nickname',
                element: <NickName />,
              },
              {
                path: 'password',
                element: <Password />,
              },
              {
                path: 'phone-number',
                element: <PhoneNumber />,
              },
              {
                path: 'email',
                element: <Email />,
              },
            ],
          },
        ],
      },
      {
        path: '/contents',
        element: <Contents />,
        children: [{ path: ':id', element: <ViewDetails /> }],
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
