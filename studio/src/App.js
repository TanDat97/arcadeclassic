import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import './styles/App.css'
import './styles/fontawesomefree5.11.2/css/all.css'

import Dashboard from './components/Dashboard'
import MyPage from './components/account/MyPage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
    </div>
  )
}

export default withRouter(App)
