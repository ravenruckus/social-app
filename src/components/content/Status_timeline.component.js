import React, { Component } from 'react'
import axios from 'axios'


export default class StatusTimeline extends Component {


  constructor(props) {
    super(props)

    this.state = {
      list: [],
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

  render() {
    const { status } = this.props;
    this.getComments(status.id)

    return (
      <div>
        <h2>Hello from status timeline</h2>
        <div style={{background: 'blue', color: '#fff', padding: '3%', borderRadius: '4px' }}>
          <p>User: {status.userId}</p>
          <p>{status.statusUpdate}</p>
          <p>Likes: {status.likes}</p>

          { this.state.list.map(ele => (
            <p>comment: {ele.statusComment}</p>
          ))}

       </div>
      </div>
    )
  }

}
