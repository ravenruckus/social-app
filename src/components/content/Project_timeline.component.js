import React, { Component } from 'react'


export default class ProjectTimeline extends Component {

  render() {
    const { project } = this.props;
    return (
      <div>
        {/* <h2>Hello from project timeline</h2> */}
          <div style={{background: '#333', color: '#fff', padding: '3%', borderRadius: '4px' }} >
            <h3>{project.title}</h3>
             <p>Project By {project.userId}</p>
             <p>{project.description}</p>
             <p>{project.likes}</p>
           </div>
      </div>


    )
  }

}
