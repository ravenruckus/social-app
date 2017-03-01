import React, { Component } from 'react'
import axios from 'axios'


export default class StatusTimeline extends Component {


  constructor(props) {
    super(props)

    this.state = {
      list: [],
      status: this.props.status,
      statusId: this.props.status.id

    }
    this.getComments = this.getComments.bind(this);

  }



  getComments(statusId) {
    axios.get(`api/status/${statusId}/comments`)
      .then(({ data }) => {
        this.setState({
          list:data
        })
      })
  }

  componentDidMount() {
    this.getComments(this.state.statusId)
  }

  render() {

    return (
      <div>
        <h2>Hello from status timeline</h2>
        <div style={{background: 'blue', color: '#fff', padding: '3%', borderRadius: '4px' }}>
          <p>User: {this.state.status.userId}</p>
          <p>{this.state.status.statusUpdate}</p>
          <p>Likes: {this.state.status.likes}</p>

          { this.state.list.map(ele => (
            <p>comment: {ele.statusComment}</p>
          ))}

       </div>
      </div>
    )
  }

}
