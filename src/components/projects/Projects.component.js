import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import ProjectsList from './ProjectsList.component'
import LeftSideProjects from './LeftSideProjects.component'
import DetailsProject from './DetailsProject.component'

import axios from 'axios'

export default class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      userId: 0,
      userName: '',
      showDetails: false,
      detailedProject: []
    }
    this.handleState = this.handleState.bind(this)
  }
  componentWillMount(){
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
  handleState(newState){
    this.setState(newState)
  }
  render(){
    const currentUserId = this.state.userId
    console.log(currentUserId);
    return(
      <div>
        <Row className="show-grid">
          <LeftSideProjects userId={currentUserId}/>
          { this.state.showDetails
            ? <DetailsProject
                detailedProject={this.state.detailedProject}
                handleDetails={(newState) => this.handleState(newState)}
                userName={this.state.userName}
                currentUserId={currentUserId}
              />
            : <ProjectsList
                projects={this.state.projects}
                userName={this.state.userName}
                UserId={this.state.userId}
                handleDetails={(newState) => this.handleState(newState)}
              />
          }
        </Row>
      </div>
    )
  }
}
