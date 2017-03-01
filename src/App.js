import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Grid } from 'react-bootstrap'
import NavBar from './components/navbar/NavBar.component'
import axios from 'axios'
// import './App.css';

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoggedIn: false,
        userId: 0,
        userName: ''
      }
      this.editParentState = this.editParentState.bind(this)
    }

    editParentState(newState) {
      this.setState(newState)
    }

    componentDidMount(){
      axios.get('/api/tokens/token')
        .then((res) => {
          if (!res.data) {
            return console.log(res);
            // return browserHistory.push('/')
          }
          this.setState(res.data)
        })
        .catch(err => {
          console.error('Error text: ' + err.responseText + '  Error status: ' + err.status);
        })
    }
    render() {
      const { isLoggedIn, userId, userName } = this.state
      console.log(this.state);
      return (
        <main>
          <NavBar isLoggedIn={this.state.isLoggedIn} userName={this.state.userName} />
          <Grid>
            { this.props.children
              ? React.cloneElement(this.props.children, {isLoggedIn, userId, userName, editParentState: this.editParentState})
              : null
            }
          </Grid>
        </main>
      );
    }
  }

export default App;
