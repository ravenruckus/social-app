import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap' //if need to use  NavDropdown, MenuItem, Button
import { Link, browserHistory } from 'react-router'
import Login from '../users/Login.component'
import axios from 'axios'
import './NavBar.css'

function LogInNavLink(statement) {
  console.log('From functional component' + statement);
  return (
    <div>
      {statement
        ? <Login />
        : null
      }
    </div>
  )
}

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleNavLinks = this.handleNavLinks.bind(this)
  }
  handleSignOut(event){
    event.preventDefault()
    axios.delete('/api/tokens/token')
      .then((res) => {
        console.log(res);
        browserHistory.push('/')
        window.location.reload()
      })
      .catch((err) => {
        console.error(err);
      })
  }
  handleNavLinks(link){
    browserHistory.push(link)
  }
  render(){
    return(
      <Navbar className="navbar" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' onClick={() => location.reload(true)}><strong>Students Social Network</strong></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={() => this.handleNavLinks('/projects')}>Projects</NavItem>
            <NavItem href="/index">Home page</NavItem>
            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown> */}
          </Nav>
          {this.props.isLoggedIn
            ? <Nav pullRight>
                <Navbar.Text>Singned as: <strong>{this.props.userName}</strong></Navbar.Text>
                <NavItem onClick={() => this.handleNavLinks('/admin/newusers')} href="admin"><strong>ADMIN PANEL</strong></NavItem>
                <NavItem onClick={this.handleSignOut} href="login"><strong>LOG OUT</strong></NavItem>
              </Nav>
            : <Nav pullRight>
                <NavItem onClick={() => LogInNavLink(true)} href="#"><strong>LOG IN</strong></NavItem>
              </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
