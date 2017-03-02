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
    // const updateComment = {comments: [...this.props.comments, newComment]}
    // this.props.editTimelineState(updateComment)

    axios.post(`/api/status/${statusId}/comments`, request)
      .then((row) => {

        console.log(row);

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
      <div>
        <div  >
         <Form>
              <FormGroup controlId="formBasicText" >
                {' '}
                <FormControl
                  type='text'
                  value={this.state.newComment}
                  placeholder='Enter text'
                  onChange={this.handleChange}
                />
                </FormGroup>
                {' '}
                <Button type="submit" onClick={this.handlePostComment}>
                Post Comment
                </Button>

            </Form>
          </div>

      </div>
    )
  }

}
