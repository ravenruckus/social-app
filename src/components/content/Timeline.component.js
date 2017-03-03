import React, { Component } from 'react'
import axios from 'axios'
import ProjectTimeline from './Project_timeline.component'
import StatusTimeline from './Status_timeline.component'
import AddStatus from './Add_status.component'




export default class Timeline extends Component {
    constructor(props) {
      super(props)

      this.state = {
        list: []
      }
      this.updateTimeline = this.updateTimeline.bind(this)


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
    updateTimeline(newListItem) {
      const newList = [newListItem, ...this.state.list]
      this.setState({list: newList})
    }


  render(){
    const { userId } = this.props;
    const currentUser = userId;

    const styleModules = this.state.list.map(ele => {
       if (ele.description) {
        return (
          <div key={ele.id + 'p'} className="timeline-components">
            <ProjectTimeline project={ele}/>
          </div>

        )
      }
      else {
        return (
          <div key={ele.id + 's'} className="timeline-components status">
            {/* <h1> logged in: {currentUser}</h1> */}


            <StatusTimeline status={ele} currentUser={currentUser}/>

          </div>

        )
      }
    })


    return(
      <div>
        <h2>user: {currentUser}</h2>
        <AddStatus currentUser={currentUser} updateTimeline={this.updateTimeline}/>

           {styleModules}



      </div>
    )
  }
}
