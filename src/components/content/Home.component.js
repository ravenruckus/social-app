import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Timeline from './Timeline.component'
import TopicSidebar from './Topic_sidebar.component'
import './home.css';

export default class Home extends Component {

  render() {
    return (
      <div className="homeBack">
      <Row>
       <Col md={3}>
         <TopicSidebar />
       </Col>

       <Col md={8}>
         <Timeline userId={this.props.userId} />
       </Col>

      </Row>
    </div>
    )
  }
}
