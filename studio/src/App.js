import React from 'react'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import { createBrowserHistory } from "history"

import Dashboard from './components/Dashboard'
import AdminDashboard from './layout/admin/AdminDashboard'
import './styles/App.css'

const hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/admin" component={AdminDashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default withRouter(App)
