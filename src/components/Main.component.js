import React, { Component } from 'react'
import { Grid, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import Login from './users/Login.component'
import RequestRegistration from './users/RequestRegistration.component'
import logo from '../logo.svg'
import './bgr.css'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      showLogin: false,
      showRequest: false
    }
    this.handleButtons = this.handleButtons.bind(this)
  }
  handleButtons(statement) {
    this.setState(statement)
  }
  render(){
    const styleText = {textAlign: 'center', color: '#b84818', fontSize: '5rem', fontWeight: 'bold'}
    const styleLogoWelcomePage = {marginLeft: '40%'}
    return(
      <div>
        {this.state.showLogin
          ? <Login />
          : <div>
            {this.state.showRequest
            ? <RequestRegistration />
            : <div>
              <video className="videoWelcomePage" poster="./bground/bgr.jpg" autoPlay="true" loop>
                <source src="./bground/bgr.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                <source src="./bground/bgr.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
              </video>
              <Grid style={{marginTop: '12%'}}>
                <Row>
                  <Col md={8} mdOffset={2}>
                    <div style={styleLogoWelcomePage}>
                      <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <h1 style={styleText}>Welcome to</h1>
                    <h1 style={styleText}>Students Social Network </h1>
                    <div className="blockButtonsWelcome">
                      <ButtonToolbar>
                        <Button className="buttonsWelcomePage" bsStyle="primary" bsSize="large" inline onClick={() => this.handleButtons({showLogin: true})}>Log In to SSN <i className="fa fa-sign-in" aria-hidden="true"></i></Button>
                        <Button className="buttonsWelcomePage" bsSize="large" inline onClick={() => this.handleButtons({showRequest: true})}>Send request for registration</Button>
                        <Button href="http://www.galvanize.com/" target="_blank" className="buttonsWelcomePage" bsSize="large" inline>More about Galvanize school</Button>
                      </ButtonToolbar>
                    </div>
                    <div>
                      <h4 style={{fontStyle: 'italic', textAlign: 'center'}}>Galvanize Students Social Network is where you can have connections between</h4>
                      <h4 style={{fontStyle: 'italic', textAlign: 'center'}}>current students and alumni WebDev and Data Scientist.</h4><br />
                      <h4 style={{fontStyle: 'italic', textAlign: 'center'}}>Share projects, online resources, books, thoughts, projects idea, comments and much more...</h4>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          }
          </div>
        }
      </div>
    )
  }
}
