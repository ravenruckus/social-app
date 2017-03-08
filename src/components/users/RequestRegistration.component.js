import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import axios from 'axios'


export default class RequestRegistration extends Component {
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      Gclass: '',
      grad_date: ''
    }
    this.handleState = this.handleState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event){
    event.preventDefault()

    const request = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      g_class: this.state.Gclass,
      grad_date: this.state.grad_date
    }

    axios.patch('/api/users/reqnew', request)
      .then((data) => {
        console.log(data)
        alert('Request was sent successfully. Check later your email for administrator approval and steps for continue registration')
      })
      .catch((err) => {
        console.error(err);
      })
  }
  handleCancel(){
    browserHistory.push('/')
  }
  render(){
    return(
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
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={6}>
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
                type="text"
                placeholder="40"
                value={this.state.Gclass}
                onChange={this.handleState}
              />
            </Col>
          </FormGroup>
          <br />
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button
                type="submit"
                onClick={this.handleSubmit}>
                Submit Request
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
