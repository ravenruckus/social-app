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
        userId: 0
      }
      this.editParentState = this.editParentState.bind(this)
    }

    editParentState(newState) {
      this.setState(newState)
    }

    // componentWillMount(){
    //   axios.get('/api/tokens/token')
    //     .then(res => {
    //       if (!res.data) {
    //         return browserHistory.push('/login')
    //       }
    //       console.log(res.data);
    //       // this.setState(res)
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     })
    // }

    render() {
      const { isLogIn } = this.state
      return (
        <main>
          <Grid>
            { this.props.children
              ? React.cloneElement(this.props.children, {isLogIn, editParentState: this.editParentState})
              : null
            }
          </Grid>
        </main>
      );
    }
  }

export default App;
