import React, { Component } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'



export default class Timeline extends Component {
    constructor(props) {
      super(props)

      this.state = {
        list: []
      }
    }

    componentDidMount() {
      this.fetchTimeline();
    }

    fetchTimeline() {
      axios.get('api/timeline')
      .then(({ data }) => {
        this.setState({
          list:data
        })
        console.log(this.state.list)


      })

    }



  render(){
    return(
      <div>
        <p>Hello from the timeline</p>
          <Row>
          <Col md={3}>
            <h3>Left sidebar</h3>

          </Col>
         <Col md={6}>
          {this.state.list.map(ele => (

          
            <div>
            <div style={{background: '#333', color: '#fff', padding: '3%', borderRadius: '4px' }} >
              <h3>{ele.title}</h3>
              <p>{ele.description}</p>
            </div>
            <div style={{background: 'blue', color: '#fff', padding: '3%', borderRadius: '4px' }}>
              <p>{ele.statusUpdate}</p>
            </div>
          </div>
          ))}
       </Col>
       <Col md={3}>
         <h3>Right Sidebar</h3>

       </Col>
       </Row>

      </div>
    )
  }
}
