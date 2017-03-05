import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'

export default class AddStatusComments extends Component {


  constructor(props) {
    super(props)

    this.state = {
      statusId: this.props.statusId,
      currentUser: this.props.currentUser,
      newComment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePostComment = this.handlePostComment.bind(this)

   }

  handleChange(e) {
    this.setState({newComment: e.target.value})
  }

  handlePostComment(event) {
    event.preventDefault()
    const {statusId, currentUser, newComment} = this.state
    const request = {userId: currentUser, statusComment: newComment}

    axios.post(`/api/status/${statusId}/comments`, request)
      .then((row) => {

        console.log(row);
        this.props.updateComments(row.data)

        this.setState({
          newComment: '',

        })
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })
  }

  render() {

    return (

        <div className="panel panel-white post panel-shadow">
          <div className="post-footer">
            <div className="input-group">
              <input
                name="commentText"
                className="form-control"
                placeholder="Post comment"
                type="text"
                value={this.state.newComment}
                onChange={this.handleChange} />
              <span className="input-group-addon">
                <a onClick={this.handlePostComment} href="#"><i className="fa fa-edit"></i></a>
              </span>
            </div>
          </div>
        </div>
    
    )
  }

}
