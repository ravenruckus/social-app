import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'



export default class DeleteStatus extends Component {


  constructor(props) {
    super(props)

    // this.state = {
    //   statusId: this.props.comment.statusId,
    //   currentUser: this.props.currentUser
    // }
    this.handleChange = this.handleChange.bind(this)
    this.handleDeleteStatus = this.handleDeleteStatus.bind(this)

  }

  handleChange(e) {
    this.setState({statusComment: e.target.value})
  }

  handleDeleteStatus(event) {
    event.preventDefault()

    const {statusId} = this.props


    axios.delete(`/api/status/${statusId}`)
      .then((row) => {
        this.props.toggleEditing()

        console.log(row)
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })
      // this.props.updateDeletedStatus(statusId)
  }

  render() {

    return (
      <div style={{marginBottom: '25px'}}>
         <Form>
                {' '}
              <button className="editButton" type="submit" onClick={this.handleDeleteStatus}>Delete</button>

            </Form>

          </div>

    )
  }

}
