import React, { Component } from 'react'
import logo from '../../logo.svg'
import axios from 'axios'
import './home.css'
import { Link, browserHistory } from 'react-router'





export default class TopicSidebar extends Component {


  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
    this.fetchProjects = this.fetchProjects.bind(this)
    this.handleNavLinks = this.handleNavLinks.bind(this)
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

    handleNavLinks(link){
      browserHistory.push(link)
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

        <h2 >Links</h2>

        <button onClick={() => this.handleNavLinks('/projects')}>Projects</button>
        <ul>
          <li><a href="https://news.ycombinator.com/">Hacker News</a></li>
          <li><a href="https://github.com/">GitHub</a></li>
          <li><a href="https://github.com/open-source-society/computer-science">Self Taught Computer Science</a></li>
          <li><a href="https://electron.atom.io/">Electron</a></li>
          <li><a href="https://react.rocks/">React Projects</a></li>



        </ul>

        {/* {
          this.state.list.map(el=> (
            <ul key={el.id}>
              <li><a href="#">{el.title}</a></li>
            </ul>
          )
        )
        } */}
      </div>


    </div>
    )
  }

}
