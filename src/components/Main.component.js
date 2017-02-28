import React, { Component } from 'react'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div style={{textAlign: 'center', margin: 'auto'}}>
        <h3>Hello <strong>{this.props.userName}</strong> from main component(it is temporary component for testing)</h3>
        <h3>If you see this page component authorization is works well</h3>
      </div>
    )
  }
}
