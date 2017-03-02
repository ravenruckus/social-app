import React, { Component } from 'react'
import { Row, Col, Thumbnail, Image, Button } from 'react-bootstrap'

export default class ProjectsList extends Component {
  constructor(props) {
    super(props)
    this.handleDetailsButton = this.handleDetailsButton.bind(this)
  }
  handleDetailsButton(el){
    let detailedProject = []
    detailedProject.push(el)

    const newState = {
      showDetails: true,
      detailedProject: detailedProject
    }
    this.props.handleDetails(newState)
  }
  render(){
    return (
          <Col md={9} sm={12}>
            <Row className="show-grid">
              {this.props.projects.map(el => (
                <Col key={el.id} sm={6} md={5} style={
                  {
                    maxHeight: '450px',
                    maxWidth: '250px',
                    // overflow: 'auto',
                    margin: '1.2rem'
                  }
                }>
                  <Thumbnail style={{border: 'none'}}>
                    <Image src={el.imgUrl} style={{width: '190px', height: '140px'}} alt="ProjectImage" rounded />
                    {/* <Link to='details'> */}
                    <h4>{el.title}</h4><hr />
                    <a href={el.webUrl}>Web Link</a><span> / </span>
                    <a href={el.githubLink}>GitHub Link</a>
                    <h4>Likes: {el.likes}</h4>
                    <h6>Created by: {el.userFirstName + ' ' + el.userLastName}</h6>
                    <p>
                      <Button bsStyle="primary" onClick={() => this.handleDetailsButton(el)}>Details</Button>&nbsp;
                      <Button bsStyle="default">Comments</Button>
                    </p>
                  </Thumbnail>
                </Col>
              ))}
            </Row>
          </Col>
    )
  }
}
