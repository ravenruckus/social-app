import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Grid } from 'react-bootstrap'
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

    componentWillMount(){
      axios.get('/api/tokens/token')
        .then(res => {
          if (!res.data) {
            return browserHistory.push('/login')
          }
          this.setState(res.data)
        })
        .catch(err => {
          console.error('Error text: ' + err.responseText + '  Error status: ' + err.status);
        })
    }

    render() {
      const { isLoggedIn, userId, userName } = this.state
      console.log('isLoggedIn' + isLoggedIn + '; userId: ' + userId + '; userName: ' + userName);
      return (
        <main>
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
