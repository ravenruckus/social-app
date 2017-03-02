import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import './home.css'




export default class AddStatus extends Component {


  constructor(props) {
    super(props)

    this.state = {
      currentUser: 2,
      newStatus: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePostStatus = this.handlePostStatus.bind(this)

  }


  handleChange(e) {
    this.setState({newStatus: e.target.value})
  }


  handlePostStatus(event) {
    event.preventDefault()
    const {currentUser, newStatus} = this.state
    const request = {userId: currentUser, statusUpdate: newStatus}
    // const updateComment = {comments: [...this.props.comments, newComment]}
    // this.props.editTimelineState(updateComment)

    axios.post('/api/status', request)
      .then((row) => {

        console.log(row);

        this.setState({
          newStatus: '',

        })
      })
      .catch((err) => {
        console.log('Error text: ' + err.responseText + '  Error status: ' + err.status);
      })
  }



  render() {

    return (
      // <div>
      //   <div  >
      //    <Form>
      //         <FormGroup controlId="formBasicText" >
      //           {' '}
      //           <FormControl
      //             type='text'
      //             value={this.state.newStatus}
      //             placeholder='Enter text'
      //             onChange={this.handleChange}
      //           />
      //           </FormGroup>
      //           {' '}
      //           <Button type="submit" onClick={this.handlePostStatus}>
      //           Post Status
      //           </Button>
      //
      //       </Form>
      //     </div>
      //
      // </div>




      <form className="form-post-status">
        <ul>

          <li>
            <textarea
              className="field-style"
              name="status"
              placeholder="Enter Status"
              type="text"
              value={this.state.newStatus}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <Button
              style={{margin: '1% 1%'}}
              bsStyle="primary"
              onClick={this.handlePostStatus}
            >SUBMIT STATUS</Button>
          </li>
        </ul>
      </form>
    )
  }

}
