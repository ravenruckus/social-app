import React, { Component } from 'react'
import axios from 'axios'
import AddStatusComments from './Add_status_comments.component'
import EditComment from './Edit_comment.component'
import { Button, Glyphicon} from 'react-bootstrap'


export default class StatusTimeline extends Component {


  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      status: this.props.status,
      statusId: this.props.status.id,
      comment: '',
      display: 'none',
      displayEdit: 'none'

    }
    this.getComments = this.getComments.bind(this)
    // this.updateComments = this.updateComments.bind(this)
    this.editTimelineState = this.editTimelineState.bind(this)
    this.editComment = this.editComment.bind(this)
    this.viewAddComment = this.viewAddComment.bind(this)
    this.viewEditComment = this.viewEditComment.bind(this)

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
    // if(currentUser === ele.userId) {
    //   return <EditComment comment={ele} currentUser={currentUser} />
    //
    // }



    if(currentUser === ele.userId) {
      return    <span onClick={this.viewEditComment} style={{marginLeft: '1%'}} onClick={this.viewEditComment}> <Glyphicon glyph="pencil" /></span>

    }


  }

  viewAddComment(event){
    event.preventDefault()
    if(this.state.display === 'none') {
      this.setState({display: 'inline-block'})
      //try to move cursor to below comments
    }
    else if(this.state.display === 'inline-block'){
      this.setState({display: 'none'})

    }
  }

  viewEditComment(event){
    event.preventDefault()
    if(this.state.displayEdit === 'none') {
      this.setState({displayEdit: 'inline-block'})
    }
    else if(this.state.displayEdit === 'inline-block'){
      this.setState({displayEdit: 'none'})

    }
  }




  render() {
    const { currentUser } = this.props;


    return (
      <div>

        <div style={{background: '#0045d8', color: '#fff', padding: '3%', borderRadius: '4px' }}>
          <p>User: {this.state.status.userId}</p>
          <p>{this.state.status.statusUpdate}</p>
          <p>Likes: {this.state.status.likes}</p>
          <div>
            <Button> <Glyphicon glyph="thumbs-up" /> Like</Button>
            <Button onClick={this.viewAddComment}> <Glyphicon glyph="comment" /> Comment </Button>



          </div>
        </div>



        <div style={{background: 'rgba(000, 000, 000, .2)', padding: '5%'}}>
          { this.state.comments.map(ele => (
            <div>
            <p>User: {ele.userId}</p>
            <p>{ele.statusComment} {this.editComment(currentUser, ele)}</p>
            <div style={{display: this.state.displayEdit }}>
            <EditComment comment={ele} currentUser={currentUser} />

          </div>


          </div>
          ))}

          <div style={{display: this.state.display}}>
            <AddStatusComments currentUser={currentUser} statusId={this.state.status.id}  />
          </div>



       </div>
      </div>
    )
  }

}
