import { createBrowserRouter, Navigate } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
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
} from '@/pages';
import ViewDetails from '@/pages/Contents/ViewDetails';
import {
  Edit as UserEdit,
  Email,
  NickName,
  Password,
  PhoneNumber,
} from '@/pages/My/Edit';
import { Favorites, FavoritesDetails } from '@/pages/My/Favorites';
import { Add, Edit as PolzzakEdit, Schedule } from '@/pages/Polzzak';
import { StepPage } from '@/pages/Register';
import SearchResult from '@/pages/Search/SearchResult';

import Modal from './components/Modal/Modal';

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
        path: '/search/result',
        element: <SearchResult />,
      },
      {
        path: '/map',
        element: <Map />,
        children: [
          {
            path: 'favorite',
            element: <Modal mode="slide" type="favorite_list" />,
          },
        ],
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
            path: 'favorites',
            element: <Favorites />,
          },
          {
            path: 'favorites/:id',
            element: <FavoritesDetails />,
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
