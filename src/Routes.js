import React, { Component } from 'react'
import { Route, Router, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Login from './components/users/Login.component'
import Main from './components/Main.component'
import RegUser from './components/users/RegUser.component'
import AdminCreateUsers from './components/users/AdminCreateUsers.component'
<<<<<<< HEAD
import Home from './components/content/Home.component'



=======
import Projects from './components/projects/Projects.component'
>>>>>>> create project components


export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <IndexRoute component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/index' component={Home} />
          <Route path='/newuser/:url' component={RegUser} />
          <Route path='/admin/newusers' component={AdminCreateUsers} />
          <Route path='/projects' component={Projects} />
        </Route>
      </Router>
    )
  }
}
