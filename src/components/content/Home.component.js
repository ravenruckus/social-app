import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Timeline from './Timeline.component'
import TopicSidebar from './Topic_sidebar.component'
import './home.css';

export default class Home extends Component {

  render() {
    return (
      <Row>
       <Col md={3}>
         <TopicSidebar />
       </Col>

       <Col md={6}>
         <Timeline />
       </Col>

       <Col md={3}>
         <h2>Right Sidebar</h2>
       </Col>

      </Row>
    )
  }
}
