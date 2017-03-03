import React, { Component } from 'react'
import './CommentBox.css'
import axios from 'axios'

export default class ProjectComments extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      commentLikes: 0,
      commentText: ''
    }
    this.handleStateComments = this.handleStateComments.bind(this)
    this.handleCreateComment = this.handleCreateComment.bind(this)
    this.handleLikeButton = this.handleLikeButton.bind(this)
  }
  componentDidMount(){
    axios.get(`/api/projects/${this.props.projectId}/comments`)
      .then((res) => {
        this.setState({comments: res.data})
      })
      .catch((err) => {
        console.error(err);
      })
  }
  handleStateComments(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleCreateComment(event){
    event.preventDefault()
    const request = {
      projectComment: this.state.commentText,
      userId: this.props.currentUserId
    }
    axios.post(`/api/projects/${this.props.projectId}/comments`, request, { validateStatus: (status) => status < 500})
      .then(res => {
        if (res.status < 400) {
          let newComments = this.state.comments
          newComments.push(res.data)
          this.setState({comments: newComments, commentText: ''})
        }
        else {
          alert("Message from server: "  + res.data)
        }
      })
      .catch(err => console.error(err))
  }
  handleLikeButton(event, element, index){
    event.preventDefault()
    let likes = element.likes + 1
    axios.post(`/api/projects/comment/${element.id}/likes`, {likes})
      .then((res) => {
        const comments = [...this.state.comments]
        comments[index].likes = res.data[0].likes
        this.setState({comments})
      })
  }
  render(){
    return(
      <div className="container">
        <div className="col-sm-8">
          <div className="panel panel-white post panel-shadow">
            <div className="post-footer">
              <div className="input-group">
                <input
                  name="commentText"
                  className="form-control"
                  placeholder="Add a new comment"
                  type="text"
                  value={this.state.commentText}
                  onChange={this.handleStateComments} />
                <span className="input-group-addon">
                  <a onClick={this.handleCreateComment} href="#"><i className="fa fa-edit"></i></a>
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.state.comments.length
            ? <div className="col-sm-8">
                {this.state.comments.map((el, i) => (
                <div className="panel panel-white post panel-shadow" key={el.id}>
                  <div className="post-heading">
                    <div className="pull-left image">
                      <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user" />
                    </div>
                    <div className="pull-left meta">
                      <div className="title h5">
                        <a href="#"><b>Paulllll!!!!!</b></a>
                        <span> made a post.</span>
                      </div>
                      <h6 className="text-muted time">1 minute ago </h6>
                      { el.createdAt !== el.updatedAt
                        ? <h6 className="text-muted time"> Updated :</h6>
                        : null
                      }
                    </div>
                  </div>
                  <div className="post-description">
                    <p>{el.projectComment}</p>
                    <div className="stats">
                      <a
                        name="commentLikes"
                        href="#"
                        className="btn btn-default stat-item"
                        onClick={() => this.handleLikeButton(event, el, i)}
                        >
                        <i className="fa fa-thumbs-up icon"></i>{el.likes}
                      </a>
                      <a href="#" className="btn btn-default stat-item">
                        <i className="fa fa-share icon"></i>
                      </a>
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="input-group">
                      <input className="form-control" placeholder="Add a comment" type="text" />
                      <span className="input-group-addon">
                        <a href="#"><i className="fa fa-edit"></i></a>
                      </span>
                    </div>
                  </div>
                </div>
                ))}
              </div>
          : <div className="col-sm-8">
              <div style={{textAlign: 'center', fontWeight: 'bold'}}><h4>Your comment will be first</h4></div>
            </div>
        }
        </div>
    )
  }
}
