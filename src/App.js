import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import NavBar from './components/navbar/NavBar.component'
import Main from './components/Main.component'
import axios from 'axios'

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
        .then((res) => {
          if (!res.data) {
            return console.log(res.data);
          }
          this.setState(res.data)
        })
        .catch(err => {
          console.error('Error text: ' + err.responseText + '  Error status: ' + err.status);
        })
    }
    render() {
      const { isLoggedIn, userId, userName } = this.state
      return (
        <div>
        {isLoggedIn
          ? <main>
              <NavBar isLoggedIn={this.state.isLoggedIn} userName={this.state.userName} />
              <Grid>
                { this.props.children
                  ? React.cloneElement(this.props.children, {isLoggedIn, userId, userName, editParentState: this.editParentState})
                  : null
                }
              </Grid>
            </main>
          : <div>
              <NavBar isLoggedIn={this.state.isLoggedIn} userName={this.state.userName} />
              <Main />
            </div>
        }
        </div>
      )
    }
  }

export default App;
