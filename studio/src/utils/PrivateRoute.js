import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Utils from 'utils/Utils';

const PrivateRoute1 = ({component: Component, ...rest}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      Utils.isLogin('user_role') ?
        <Component {...props} />
      : <Redirect to="/signin" />
    )} />
  );
};

const PrivateRoute2 = ({component: Component, ...rest}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      Utils.isLogin('admin_role') ?
        <Component {...props} />
      : <Redirect to="/signin/admin" />
    )} />
  );
};

export default {
  PrivateRoute1,
  PrivateRoute2
}