import React, { Component } from 'react'
import { Image } from 'react-bootstrap'


export default class ProjectTimeline extends Component {

  render() {
    const { project } = this.props;
    return (
      <div>
        {/* <h2>Hello from project timeline</h2> */}
          <div className="timelineProjects" >
            <h3 style={{color: '#ff8602', marginBottom: '15px'}}>{project.title}</h3>
              <Image src={project.imgUrl} style={{width: '60%', marginLeft: '20%'}} responsive thumbnail/>
            <p>Project By {project.userId}</p>
             <p>{project.description}</p>
             <p style={{fontSize: '2rem'}}>Likes: {project.likes}</p>
           </div>
      </div>


    )
  }

}
