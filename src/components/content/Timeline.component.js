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


  render(){
    const { userId } = this.props;

    const styleModules = this.state.list.map(ele => {
       if (ele.description) {
        return (

          <ProjectTimeline project={ele}/>

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
