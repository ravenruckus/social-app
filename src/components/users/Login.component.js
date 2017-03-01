import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Form, FormGroup, FormControl, ControlLabel, Button, Col } from 'react-bootstrap'
import axios from 'axios'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleState = this.handleState.bind(this)
    this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmitLogIn(event){
    event.preventDefault()
    const request = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/api/tokens/token', request, { validateStatus: (status) => status < 500})
      .then((row) => {
        if (row.status < 400) {
          const user = {
            isLoggedIn: true,
            userId: row.data.id,
            userName: `${row.data.firstName} ${row.data.lastName}`
          }
          this.props.editParentState(user)
          browserHistory.push('/')
        }
        else {
          alert("Message from server: "  + row.data)
          this.setState({ email: '', password: ''})
        }
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })
  }
  handleCancel(){
    browserHistory.push('/')
  }
  render(){
    return (
      <div style={{margin: '10% 20%'}}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleState}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleState}
              />
            </Col>
          </FormGroup>
{/*
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup> */}

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button
                type="submit"
                onClick={this.handleSubmitLogIn}>
                Log In
              </Button>
              <Button
                style={{margin: '0 5%'}}
                type="button"
                onClick={this.handleCancel}>
                Cancel
              </Button>
            </Col>

          </FormGroup>
        </Form>
      </div>
    )
  }
}
