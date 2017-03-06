import React, { Component } from 'react'
import { Route, Router, browserHistory, IndexRoute, IndexRedirect } from 'react-router'
import App from './App'
import Login from './components/users/Login.component'
import RegUser from './components/users/RegUser.component'
import AdminCreateUsers from './components/users/AdminCreateUsers.component'
import Home from './components/content/Home.component'
import Projects from './components/projects/Projects.component'
// import RequestRegistration from './components/users/RequestRegistration.component'


export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <IndexRedirect to='/index' />
          <Route path='login' component={Login} />
          <Route path='/index' component={Home} />
          <Route path='/newuser/:url' component={RegUser} />
          <Route path='/admin/newusers' component={AdminCreateUsers} />
          <Route path='/projects' component={Projects} />
          {/* <Route path='/request' component={RequestRegistration} /> */}
        </Route>
      </Router>
    )
  }
}
