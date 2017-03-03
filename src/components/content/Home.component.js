import React, { Component } from 'react'
// import logo from '../../logo.svg';
import { Col, Row } from 'react-bootstrap'
import Timeline from './Timeline.component'
import TopicSidebar from './Topic_sidebar.component'
import './home.css';

export default class Home extends Component {

  render() {
    return (
      // <div>
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //   </div>
      // </div>

      <div className="home">
      <Row>
       <Col md={4}>
         <TopicSidebar />
       </Col>

       {/* <Col md={1}>

       </Col> */}

       <Col style={{marginTop: '25px'}} md={8}>
         <Timeline userId={this.props.userId} />
       </Col>

      </Row>
    </div>
  // </div>
    )
  }
}
