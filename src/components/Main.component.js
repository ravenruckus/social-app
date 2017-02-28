import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleNewUsers = this.handleNewUsers.bind(this)
  }
  handleSignOut(){
    axios.delete('/api/tokens/token')
      .then((res) => {
        console.log(res);
        browserHistory.push('/login')
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })
  }
  handleNewUsers(){
    browserHistory.push('/admin/newusers')
  }
  render(){
    return(
      <div style={{textAlign: 'center', margin: 'auto'}}>
        <h3>Hello <strong>{this.props.userName}</strong> from main component(it is temporary component for testing)</h3>
        <h3>If you see this page component authorization is works well</h3>
        <button type="button" onClick={this.handleSignOut}>Sign out</button>
        <button type="button" onClick={this.handleNewUsers}>Create users</button>
      </div>
    )
  }
}
