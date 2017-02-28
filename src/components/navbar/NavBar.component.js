import React, { Component } from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import './NavBar.css'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleAdmin = this.handleAdmin.bind(this)
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
  handleLogIn(){
    browserHistory.push('/login')
  }
  handleAdmin(){
    browserHistory.push('/admin/newusers')
  }
  render(){
    return(
      <Navbar className="navbar" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'><strong>Student Social Network</strong></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {/* <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav> */}
          {this.props.isLoggedIn
            ? <Nav pullRight>
                <Navbar.Text>Singned as: <strong>{this.props.userName}</strong></Navbar.Text>
                <NavItem onClick={this.handleAdmin} href="admin"><strong>ADMIN PANEL</strong></NavItem>
                <NavItem onClick={this.handleSignOut} href="login"><strong>LOG OUT</strong></NavItem>
              </Nav>
            : <Nav pullRight>
                <NavItem onClick={this.handleLogIn} href="/login"><strong>LOG IN</strong></NavItem>
              </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}