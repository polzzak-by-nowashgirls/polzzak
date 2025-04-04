import { createBrowserRouter, Navigate } from 'react-router-dom';

import ViewDetails from '@/pages/Contents/ViewDetails';
import {
  Edit as UserEdit,
  Email,
  NickName,
  Password,
  PhoneNumber,
} from '@/pages/My/Edit';
import { StepPage } from '@/pages/Register';

import RootLayout from './layouts/RootLayout';
import {
  Bookmark,
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
import { Add, Edit as PolzzakEdit, Schedule } from './pages/Polzzak';

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
            path: 'edit/:id',
            element: <PolzzakEdit />,
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
            element: <UserEdit />,
            children: [
              {
                index: true,
                element: <UserEdit />,
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
          {
            path: 'bookmark',
            element: <Bookmark />,
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
