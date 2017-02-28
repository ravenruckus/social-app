import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Form, FormGroup, FormControl, ControlLabel, Button, Col } from 'react-bootstrap'
import axios from 'axios'

export default class RegUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      Gclass: '',
      grad_date: '',
      is_registred: false
    }
    this.handleState = this.handleState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  componentWillMount(){
    axios.get(`/api/users/newuser/${this.props.params.url}`)
      .then((user) => {
        console.log(user.data);
        this.setState({
          id: user.data.id,
          first_name: user.data.first_name,
          last_name: user.data.last_name,
          email: user.data.email,
          Gclass: user.data.Gclass,
          grad_date: user.data.grad_date
        })
      })
      .catch((err) => {
        return console.error(err)
      })
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event){
    event.preventDefault()

    const request = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      Gclass: this.state.Gclass,
      grad_date: this.state.grad_date,
      is_registred: true
    }
    axios.patch('/api/users/newuser', request)
      .then((data) => {
        console.log(data)
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
            <Col componentClass={ControlLabel} sm={4}>
              First and Last Name
            </Col>
            <Col sm={4}>
              <FormControl
                name="first_name"
                type="text"
                placeholder="First name"
                value={this.state.first_name}
                onChange={this.handleState}
              />
            </Col>
            <Col sm={4}>
              <FormControl
                name="last_name"
                type="text"
                placeholder="Last name"
                value={this.state.last_name}
                onChange={this.handleState}
              />
            </Col>
          </FormGroup>
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
            <Col sm={5}>
              <FormControl
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleState}
              />
            </Col>
            <Col sm={5}>
              <FormControl
                name="confirm_password"
                type="password"
                placeholder="Confirm password"
                value={this.state.confirm_password}
                onChange={this.handleState}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={5}>
              Graduation Date and Class:
            </Col>
            <Col sm={4}>
              <FormControl
                name="grad_date"
                type="date"
                value={this.state.grad_date}
                onChange={this.handleState}
              />
            </Col>
            <Col sm={2}>
              <FormControl
                name="Gclass"
                type="number"
                placeholder="40"
                value={this.state.Gclass}
                onChange={this.handleState}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button
                type="submit"
                onClick={this.handleSubmit}>
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
