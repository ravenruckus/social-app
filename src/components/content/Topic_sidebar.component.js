import React, { Component } from 'react'
import logo from '../../logo.svg'
import axios from 'axios'
import './home.css';




export default class TopicSidebar extends Component {


  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
    this.fetchProjects = this.fetchProjects.bind(this)

  }


  fetchProjects() {
    axios.get('api/projects')
    .then(({ data }) => {
      console.log(data)
      this.setState({
        list:data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }


  componentDidMount() {
      this.fetchProjects();
    }



  render() {
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>

      <div  className="homeProjects">

        <h2 >Projects</h2>
        <button>Projects</button>

        {
          this.state.list.map(el=> (
            <ul key={el.id}>
              <li><a href="#">{el.title}</a></li>
            </ul>
          )
        )
        }
      </div>


    </div>
    )
  }

}
