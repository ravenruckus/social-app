import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import ProjectsList from './ProjectsList.component'
import LeftSideProjects from './LeftSideProjects.component'

import axios from 'axios'

export default class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      userId: 0,
      userName: ''
    }
  }
  componentDidMount(){
    axios.get('/api/projects')
      .then(res => {
        this.setState({
          projects: res.data,
          userId: this.props.userId,
          userName: this.props.userName
        })
      })
      .catch( err => {
        console.error(err);
      })
  }
  render(){
    return(
      <div>Hi from Projects
        <Row className="show-grid">
          <LeftSideProjects userId={this.state.userId}/>
          <ProjectsList projects={this.state.projects} userName={this.state.userName}/>
        </Row>
      </div>
    )
  }
}
