 import React, { Component } from 'react'
import axios from 'axios'
import AddStatusComments from './Add_status_comments.component'
import EditComment from './Edit_comment.component'
import DeleteStatus from './DeleteStatus.component'
import { Glyphicon} from 'react-bootstrap'
import '../comments/CommentBox.css'

export default class StatusTimeline extends Component {

  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      status: this.props.status,
      statusId: this.props.status.id,
      comment: '',
      display: 'none',
      displayEdit: null,
      statusDisplay: 'inline-block',
      currentCommentId: '',
      editedComment: ''
    }
    this.getComments = this.getComments.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.editTimelineState = this.editTimelineState.bind(this)
    this.editComment = this.editComment.bind(this)
    this.viewAddComment = this.viewAddComment.bind(this)
    this.viewEditComment = this.viewEditComment.bind(this)
    this.updateEditedComment = this.updateEditedComment.bind(this)
    this.updateDeletedComment = this.updateDeletedComment.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
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

  editTimelineState(newState) {
    this.setState(newState)
  }

  editComment(currentUser, ele) {
    if(currentUser === ele.userId) {
      return    <span onClick={ (event) => this.viewEditComment(event, ele)} style={{marginLeft: '1%'}}> <Glyphicon glyph="pencil" /></span>
    }
  }

  viewAddComment(event){
    event.preventDefault()
    if(this.state.display === 'none') {
      this.setState({display: 'inline-block'})
    }
    else if(this.state.display === 'inline-block'){
      this.setState({display: 'none'})

    }
  }

  viewEditComment(event, ele){
    event.preventDefault()
    this.setState({displayEdit: ele.id})
  }

  toggleEditing() {
    this.setState({displayEdit: null})
  }
  updateComments(comment) {
    const newComments = [...this.state.comments, comment]
    this.setState({comments: newComments})
  }

  updateEditedComment(editedComment) {
    const newComments = this.state.comments
      for(const e of newComments) {
        if(e.id === editedComment.id) {
          e.statusComment = editedComment.statusComment
        }
      }
     this.setState({comments: newComments})
    }

    updateDeletedComment(commentId) {
      let newComments = this.state.comments

      newComments = newComments.filter(function(el) {return el.id !== commentId })

      this.setState({comments: newComments})
    }

      updateStatus(newStatus) {
        this.setState({statues: newStatus})
      }


  render() {
    const { currentUser } = this.props;
    const { status } = this.props;

    return (
      <div className="status">
       <div className="status-box">

         <div>
          <p style={{color: '#ff8602'}}>User: {this.state.status.userId}</p>
          <p style={{fontSize: '2rem'}}>{this.state.status.statusUpdate}</p>
          {/* { this.state.displayEdit !== status.id ?
          <p style={{fontSize: '2rem'}}>{this.state.status.statusUpdate}{this.editComment(currentUser, status)}</p>
          :
          <DeleteStatus  statusId={status.id}/>
          } */}

          <div className="status-comment-area">
           {this.state.comments.map((ele) => (
             <div key={ele.id}>

              { this.state.displayEdit !== ele.id ?
                <p style={{display: this.state.statusDisplay}}>User {ele.userId}: {ele.statusComment} {this.editComment(currentUser, ele)}</p>
                :
                <div>
                  <EditComment updateEditedComment={this.updateEditedComment} comment={ele} currentUser={currentUser} updateDeletedComment={this.updateDeletedComment} toggleEditing={this.toggleEditing}/>
                </div>
              }
             </div>
          ))}

            <AddStatusComments updateComments={this.updateComments} currentUser={currentUser} statusId={this.state.status.id}  />
          </div>

        </div>
       </div>
    </div>
    )
  }
}
