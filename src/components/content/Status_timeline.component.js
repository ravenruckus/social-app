import React, { Component } from 'react'
import axios from 'axios'
import AddStatusComments from './Add_status_comments.component'
import EditComment from './Edit_comment.component'

export default class StatusTimeline extends Component {


  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      status: this.props.status,
      statusId: this.props.status.id,
      comment: ''

    }
    this.getComments = this.getComments.bind(this)
    // this.updateComments = this.updateComments.bind(this)
    this.editTimelineState = this.editTimelineState.bind(this)
    this.editComment = this.editComment.bind(this)

  }



  getComments(statusId) {
    axios.get(`api/status/${statusId}/comments`)
      .then(({ data }) => {
        this.setState({
          comments:data
        })
      })
  }

  componentDidMount() {
    this.getComments(this.state.statusId)
  }

  // updateComments(comment) {
  //
  //
  //     this.setState({
  //       comments: [...this.state.comments, newComment]
  //
  //     })
  // }
  editTimelineState(newState) {
    this.setState(newState)
  }

  editComment(currentUser, ele) {
    if(currentUser === ele.userId) {
      return <EditComment statusId={ele.statusId} commentId={ele.id} currentUser={currentUser} commentUserId={ele.userId}/>

    }
  }




  render() {
    const { currentUser } = this.props;

    return (
      <div>

        <h2>Hello from status timeline I'm {currentUser}</h2>
        <div style={{background: 'blue', color: '#fff', padding: '3%', borderRadius: '4px' }}>
          <p>User: {this.state.status.userId}</p>
          <p>{this.state.status.statusUpdate}</p>
          <p>Likes: {this.state.status.likes}</p>

          <AddStatusComments currentUser={currentUser} statusId={this.state.status.id}  comments={this.state.comments} editTimelineState={this.editTimelineState} />


          { this.state.comments.map(ele => (
            <div>
            <p>comment: {ele.statusComment}</p>
            {this.editComment(currentUser, ele)}


          </div>
          ))}

       </div>
      </div>
    )
  }

}
