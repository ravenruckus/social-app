import React, { Component } from 'react'
import axios from 'axios'
import ProjectTimeline from './Project_timeline.component'
import StatusTimeline from './Status_timeline.component'



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
    // getComments(userId) {
    //
    //   axios.get(`api/status_comments/:${statusId}`)
    //     .then(({comments}) => {
    //
    //     })
    //
    //
    // }

//make a module for status, make a module for project
//have a parent component that passes data into components with this.props

  render(){
    const { userId } = this.props;

    // const { status } = this.props;

    const styleModules = this.state.list.map(ele => {
       if (ele.description) {
        return (
          <ProjectTimeline project={ele}/>

          // <div style={{background: '#333', color: '#fff', padding: '3%', borderRadius: '4px' }} >
          //   <h3>{ele.title}</h3>
          //   <p>Project By {ele.userId}</p>
          //   <p>{ele.description}</p>
          //   <p>{ele.likes}</p>
          // </div>
        )
      }
      else {
        return (
          <div>
          <h1> logged in: {userId}</h1>

          <StatusTimeline status={ele}/>
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
