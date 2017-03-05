import React, { Component } from 'react'
// import logo from '../../logo.svg';
import { Col, Row } from 'react-bootstrap'
import Timeline from './Timeline.component'
import TopicSidebar from './Topic_sidebar.component'
import './home.css';

export default class Home extends Component {

  render() {
    return (
      <div className="home">
      <Row>
       <Col smHidden xsHidden md={4}>
         <TopicSidebar />
       </Col>

       <Col style={{marginTop: '25px'}} md={8}>
         <Timeline userId={this.props.userId} />
       </Col>

      </Row>
    </div>
    )
  }
}
