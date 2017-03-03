import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import PostProject from './PostProject.component'
import './BigButton.css'
import logo from '../../logo.svg'
import axios from 'axios'


export default class LeftSideProjects extends Component {
  constructor(props){
    super(props)
    this.state ={
      showModal: false,
      list: []
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
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>

      <div  className="homeProjects">
        <h2 >Projects</h2>
      </div>


    </div>
        {/* <a style={{margin: '14% 0'}} href="/projects" className="bigButton">PROJECTS</a> <br /> */}
        {/* <a href="#" className="postButton" onClick={this.handlePostProject}>POST NEW PROJECT</a> */}
        <button className="addPostButton" onClick={this.handlePostProject}>Post New Project</button>
        {this.state.showModal
          ? <PostProject
            showModal={this.handlePostProject}
            currentUserId={this.props.userId}
            handleDetails={(newState) => this.handleState(newState)}
          />
          : null
        }

      </Col>

    )
  }
}
