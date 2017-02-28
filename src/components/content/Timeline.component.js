import React, { Component } from 'react'
import axios from 'axios'



export default class Timeline extends Component {
    constructor(props) {
      super(props)

      this.state = {
        list: [],
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

      })

    }
    getComments(userId) {
      
    }



  render(){

    const styleModules = this.state.list.map(ele => {
       if (ele.description) {
        return (
          <div style={{background: '#333', color: '#fff', padding: '3%', borderRadius: '4px' }} >
            <h3>{ele.title}</h3>
            <p>Project By {ele.userId}</p>
            <p>{ele.description}</p>
            <p>{ele.likes}</p>
          </div>
        )
      }
      else {
        return (
          <div style={{background: 'blue', color: '#fff', padding: '3%', borderRadius: '4px' }}>
            <p>User: {ele.userId}</p>
            <p>{ele.statusUpdate}</p>
            <p>Likes: {ele.likes}</p>
          </div>
        )
      }
    })


    return(
      <div>
        <p>Hello from the timeline</p>

           {styleModules}



      </div>
    )
  }
}
