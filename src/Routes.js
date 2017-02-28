import React, { Component } from 'react'
import { Route, Router, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Login from './components/users/Login.component'
import Main from './components/Main.component'
import Timeline from './components/content/Timeline.component'


export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <IndexRoute component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/index' component={Timeline} />
        </Route>
      </Router>
    )
  }
}
