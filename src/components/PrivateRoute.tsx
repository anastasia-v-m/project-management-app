import React from 'react';
import { Navigate } from 'react-router-dom';
import { WELCOM_PAGE_URL } from '../containers/utlsList';
import { getToken } from '../modules/commonFunctions';

export default function PrivateRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { pathname } = document.location;

  if (!getToken()) {
    return <Navigate to={WELCOM_PAGE_URL} />;
  }

  return children;
}
