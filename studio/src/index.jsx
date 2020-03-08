/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// core components
import Admin from 'layouts/admin/Admin'
import AdminSignin from 'views/admin/AdminSignin'
import Signin from 'views/user/Signin'
import Signup from 'views/user/Signup'
import ForgotPassword from 'views/ForgotPassword'
import PrivateRoute from 'utils/PrivateRoute'

import 'assets/css/material-dashboard-react.css?v=1.8.0';

import * as serviceWorker from 'serviceWorker'
import configureStore from '_store/configureStore'
const store = configureStore()

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={hist}>
        <Switch>
          <PrivateRoute.PrivateRoute2 path='/admin' component={Admin} />
          <Route path='/signin/admin' component={AdminSignin} />
          {/* <Route path='/' component={Dashboard} /> */}
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/forgotpassword' component={ForgotPassword} />
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister()