import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import PostProject from './PostProject.component'
import './BigButton.css'

export default class LeftSideProjects extends Component {
  constructor(props){
    super(props)
    this.state ={
      showModal: false
    }
    this.handlePostProject = this.handlePostProject.bind(this)
  }
  handlePostProject(){
    if(this.state.showModal) {
      this.setState({showModal: false})
    }
    else {
      this.setState({showModal: true})
    }
  }

  render(){
    return (
      <Col md={3} sm={2}>
        <a style={{margin: '14% 0'}} href="#" className="bigButton">PROJECTS</a> <br />
        <a href="#" className="postButton" onClick={this.handlePostProject}>POST NEW PROJECT</a>
        {this.state.showModal
          ? <PostProject showModal={this.handlePostProject}/>
          : null
        }
      </Col>
    )
  }
}
