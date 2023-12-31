import React from 'react';
import {
  BrowserRouter as ReactRouter, Outlet, Route, Routes,
} from 'react-router-dom';
import ShoppingLists from '../pages/ShoppingLists';
import NavigationBar from './NavigationBar';
import NotFound from '../pages/NotFound';
import ShoppingListDetail from '../pages/ShoppingListDetail';

const Router = () => {
  const routes = [
    {
      path: '/',
      element: <ShoppingLists />,
    },
    {
      path: '/shopping-lists/:id',
      element: <ShoppingListDetail />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <ReactRouter basename="/">
      <NavigationBar />
      <Routes>
        <Route element={<Outlet />}>
          {routes.map(({
            path,
            element,
          }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </ReactRouter>
  );
};

export default Router;
