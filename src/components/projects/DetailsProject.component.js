import React, { Component } from 'react'
import { Col, Row, Image, ControlLabel, Button } from 'react-bootstrap'
import ProjectComments from '../comments/ProjectComments.component'


export default class DetailsProject extends Component {
  constructor(props){
    super(props)
    this.state ={
      showComments: false,
      likes: 0
    }
    this.handleStateDetails = this.handleStateDetails.bind(this)
    this.handleLikes = this.handleLikes.bind(this)
  }
  componentWillMount(){
    const newDatailsState = this.props.detailedProject[0]
    console.log(newDatailsState);
    this.setState({likes: newDatailsState.likes})
  }
  handleLikes(like){
    let likes = like + 1;

    this.setState({likes})
  }
  handleStateDetails(newState){
    this.setState(newState)
  }
  render(){
    return(
      <div>{ this.props.detailedProject.map(el => {
          return (
            <Col md={9} sm={12} key={el.id}>
              <Row className="show-grid">
                <Col md={12} sm={12} style={{margin: '5% 10%'}}>
                  <h2 style={{margin: '0 15%'}}><strong>{el.title}</strong></h2>
                  <Image style={{maxWidth: '650px', maxHeight: '440px'}} src={el.imgUrl} responsive rounded />
                </Col>
                <Col componentClass={ControlLabel} sm={3} md={3} mdOffset={1}><h4><strong>Links for project: </strong></h4></Col>
                <Col sm={3}><a href={el.githubLink}><h4><strong>GitHub Link of project</strong></h4></a></Col>
                <Col sm={3}><a href={el.webUrl}><h4><strong>Application Web Link</strong></h4></a></Col>

                <Col componentClass={ControlLabel} md={4}><h4><strong>Description of project: </strong></h4></Col>
                <Col sm={9} md={9} mdOffset={1}><p>{el.description}</p></Col>

                <Col md={10} mdOffset={1}>
                  <h4>Project has <strong style={{color: 'green'}}>{this.state.likes} likes</strong></h4>
                  <h4>Project has <strong style={{color: 'blue'}}>{el.id} comments</strong></h4>
                  <h5>Created by: {el.userFirstName + ' ' + el.userLastName}</h5>
                </Col>

                <Col md={10} mdOffset={1}>
                  <Button bsStyle="success"
                    style={{margin: '5% 15% 5% 7%'}}
                    value={this.state.likes}
                    onClick={() => this.handleLikes(el.likes)}
                    >Like this project!</Button>&nbsp;
                  <Button bsStyle="default" onClick={() => this.handleStateDetails({showComments: true})}>Read comments and leave feedback</Button>
                </Col>
                {this.state.showComments
                  ? <ProjectComments />
                  : null
                }
            </Row>
          </Col>
          )
        })}
      </div>
    )
  }
}
