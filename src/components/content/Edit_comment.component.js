import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'



export default class EditComment extends Component {


  constructor(props) {
    super(props)

    this.state = {
      statusId: this.props.comment.statusId,
      currentUser: this.props.currentUser,
      statusComment: this.props.comment.statusComment,
      commentId: this.props.comment.id
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  handleChange(e) {
    this.setState({statusComment: e.target.value})
  }

  handleEditComment(event) {
    event.preventDefault()
    const {statusId, commentId} = this.state
    const request = {statusComment: this.state.statusComment}

    axios.patch(`/api/status/${statusId}/comments/${commentId}`, request)
      .then((row) => {

        console.log(row);
        this.props.updateEditedComment(row.data)
        this.props.toggleEditing()
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })
  }

  handleDeleteComment(event) {
    event.preventDefault()

    const {statusId, commentId} = this.state

    axios.delete(`/api/status/${statusId}/comments/${commentId}`)
      .then((row) => {
        this.props.toggleEditing()

        console.log(row)
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })

      this.props.updateDeletedComment(commentId)

  }

  render() {

    return (
      <div style={{marginBottom: '25px'}}>
         <Form>
              <FormGroup controlId="formBasicText" >
                <ControlLabel>Edit Comment</ControlLabel>
                {' '}
                <FormControl
                  type='text'
                  value={this.state.statusComment}
                  placeholder={this.state.statusComment}
                  onChange={this.handleChange}
                />
                </FormGroup>
                {' '}
                <button className="editButton" type="submit" onClick={this.handleEditComment}>
                Edit
              </button>
              <button className="editButton" type="submit" onClick={this.handleDeleteComment}>Delete</button>

            </Form>

          </div>
    )
  }

}
