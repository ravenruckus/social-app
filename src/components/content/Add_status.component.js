import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import './home.css'




export default class AddStatus extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    const { currentUser } = this.props;
    const {newStatus} = this.state
    const request = {userId: currentUser, statusUpdate: newStatus}

    axios.post('/api/status', request)
      .then((row) => {
        console.log(row.data)
        this.props.updateTimeline(row.data)

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
        <div className="updateStatus">
        <div className="panel panel-white post panel-shadow">
          <div className="post-footer">
            <div className="input-group">
              <input
                name="commentText"
                className="form-control"
                placeholder="What is on your mind today?"
                type="text"
                value={this.state.newStatus}
                onChange={this.handleChange} />
              <span className="input-group-addon">
                <a onClick={this.handlePostStatus} href="#"><i className="fa fa-edit"></i></a>
              </span>
            </div>
          </div>
        </div>
      </div>







      // <form className="form-post-status">
      //   <ul>
      //
      //     <li>
      //       <textarea
      //         className="field-style"
      //         name="status"
      //         placeholder="Enter Status"
      //         type="text"
      //         value={this.state.newStatus}
      //         onChange={this.handleChange}
      //       />
      //     </li>
      //     <li>
      //       <button
      //         style={{margin: '1% 1%', bordeRadius: '8px'}}
      //         bsStyle="primary"
      //         onClick={this.handlePostStatus}
      //       >Post</button>
      //     </li>
      //   </ul>
      // </form>
    )
  }

}
