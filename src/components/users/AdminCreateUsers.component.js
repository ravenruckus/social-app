import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import axios from 'axios'

export default class AdminCreateUsers extends Component {
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      is_admin: false
    }
    this.handleChanges = this.handleChanges.bind(this)
    this.handleSendInvitation = this.handleSendInvitation.bind(this)
  }
  handleChanges(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSendInvitation(event){
    event.preventDefault()
    const { first_name, last_name, email, is_admin } = this.state
    const request = { first_name, last_name, email, is_admin }
    axios.post('/api/admin/newusers', request, { validateStatus: (status) => status < 500})
      .then((res) => {
        if (res.status > 400) {
          console.log(res);
          this.setState({
            first_name: '',
            last_name: '',
            email: '',
            is_admin: false
          })
          alert('User ' + res.config.data + ' Succesfully created in database and invitation was send to email')
        }
        alert("Message from server: "  + res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render(){
    return(
      <div style={{margin: '10% 3%'}}>
        <hr />
        <h2 style={{margin: '5% 20%'}}>Creating users and send them invitation</h2>
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>First Name</ControlLabel>
            {' '}
            <FormControl
              name="first_name"
              type="text"
              placeholder="Jane"
              value={this.state.first_name}
              onChange={this.handleChanges}
            />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineName">
            <ControlLabel>Last Name</ControlLabel>
            {' '}
            <FormControl
              name="last_name"
              type="text"
              placeholder="Smith"
              value={this.state.last_name}
              onChange={this.handleChanges}
            />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Email</ControlLabel>
            {' '}
            <FormControl
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={this.state.email}
              onChange={this.handleChanges}
            />
          </FormGroup>
          {' '}
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Is Admin</ControlLabel>
            {' '}
            <FormControl
              name="is_admin"
              componentClass="select"
              placeholder="select"
              value={this.state.is_admin}
              onChange={this.handleChanges}>
              <option value="true">true</option>
              <option value="false">false</option>
            </FormControl>
          </FormGroup>
          {' '}
          <Button type="submit" onClick={this.handleSendInvitation}>
            Send invitation
          </Button>
        </Form>
        <hr />
      </div>
    )
  }
}
