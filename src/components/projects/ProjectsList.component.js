import React, { Component } from 'react'
import { Row, Col, Thumbnail, Image, Button } from 'react-bootstrap'

export default class ProjectsList extends Component {
  constructor(props) {
    super(props)
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
                    <p>Created by: {el.userId}</p>
                    <p>
                      <Button bsStyle="primary">Details</Button>&nbsp;
                      <Button bsStyle="default">Comment</Button>
                    </p>
                  </Thumbnail>
                </Col>
              ))}
            </Row>
          </Col>
    )
  }
}
