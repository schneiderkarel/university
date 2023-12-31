import React, { useContext } from 'react';
import {
  BrowserRouter as ReactRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import ShoppingLists from '../pages/ShoppingLists';
import NavigationBar from './NavigationBar';
import NotFound from '../pages/NotFound';
import ShoppingListDetail from '../pages/ShoppingListDetail';
import CallerContext from '../context/caller.context';
import ProtectedRoute from './ProtectedRoute';
import UserCreateForm from '../pages/UserCreateForm';

const Router = () => {
  const [caller] = useContext(CallerContext);

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
        <Route
          path="/users"
          element={!caller ? <UserCreateForm /> : <Navigate to="/" />}
        />

        <Route element={<ProtectedRoute caller={caller} />}>
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
