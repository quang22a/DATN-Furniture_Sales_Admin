import React from 'react';
import { Navigate } from 'react-router';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  return token ? true : false;
}

export function privateRoute(Wrapped) {
  return (props) => isAuthenticated() ? <Wrapped /> : <Navigate to="/auth/login" />;
}
