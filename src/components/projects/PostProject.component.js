import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import './PostProject.css'

export default class PostProject extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      imgUrl: '',
      githubLink: '',
      webUrl: '',
      githubReadme: '',
      description: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
  }
  handleOnChange(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmitPost(){
    const request = {
      title: this.state.title,
      imgUrl: this.state.imgUrl,
      githubLink: this.state.githubLink,
      webUrl: this.state.webUrl,
      githubReadme: this.state.githubReadme,
      description: this.state.description,
      userId: this.props.userId,
      likes: 0
    }
    axios.post('/api/projects', request, { validateStatus: (status) => status < 500})
      .then((row) => {
        if (row.status < 400) {
          alert("Project successfully posted. Thank you!")
          this.props.showModal
          // browserHistory.push('/projects')
        }
        else {
          alert("Message from server: "  + row.data)
          this.setState({
            title: '',
            imgUrl: '',
            githubLink: '',
            webUrl: '',
            githubReadme: '',
            description: ''
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }
  render(){
    return(
      <div>
        <div className="static-modal">
          <Modal.Dialog>
              <form className="form-post-project">
                <ul>
                  <li>
                    <input
                      className="field-style field-split align-left"
                      name="title"
                      placeholder="Title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleOnChange}
                    />
                    <input
                      className="field-style field-split align-right"
                      name="imgUrl"
                      placeholder="Image URL"
                      type="url"
                      value={this.state.imgUrl}
                      onChange={this.handleOnChange}
                    />
                  </li>
                  <li>
                    <input
                      className="field-style field-split align-left"
                      name="githubLink"
                      placeholder="GitHub Link"
                      type="url"
                      value={this.state.web_url}
                      onChange={this.handleOnChange}
                    />
                    <input
                      className="field-style field-split align-right"
                      name="webUrl"
                      placeholder="Web URL"
                      type="url"
                      value={this.state.webUrl}
                      onChange={this.handleOnChange}
                    />
                  </li>
                  <li>
                    <input
                      className="field-style field-full align-none"
                      name="githubReadme"
                      placeholder="Link README on GitHub"
                      type="url"
                      value={this.state.githubReadme}
                      onChange={this.handleOnChange}
                    />
                  </li>
                  <li>
                    <textarea
                      className="field-style"
                      name="description"
                      placeholder="Short project description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleOnChange}
                    />
                  </li>
                  <li>
                    <Button
                      style={{margin: '3% 5%'}}
                      bsStyle="primary"
                      onClick={this.handleSubmitPost}
                    >SUBMIT PROJECT</Button>
                    <Button onClick={this.props.showModal}>CANCEL</Button>
                  </li>
                </ul>
              </form>
          </Modal.Dialog>
        </div>
      </div>
    )
  }
}
