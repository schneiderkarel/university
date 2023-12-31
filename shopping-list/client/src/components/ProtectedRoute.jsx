import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ caller }) => (
  caller
    ? <Outlet />
    : <Navigate to="/users" />
);

ProtectedRoute.propTypes = {
  caller: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  caller: '',
};

export default ProtectedRoute;
