import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import './styles/App.css'
import './styles/fontawesomefree5.11.2/css/all.css'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </div>
  )
}

export default withRouter(App)
