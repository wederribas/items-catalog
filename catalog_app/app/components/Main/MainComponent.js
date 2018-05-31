import React, {Component} from 'react'
import {Navigation} from 'components'
import {withRouter} from 'react-router-dom'
import {container, innerContainer} from './styles.css'
import {firebaseAuth} from 'config/constants'
import auth, {logout, registerUser} from 'helpers/auth'
import {AuthedUserContext} from 'context/authedUserContext'

class MainContainer extends Component {
  // Using constructor in this component to allow the Context API to
  // trigger functions in nested components.
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      isAuthed: false,
      unAuthUser: this.unAuthUser,
    }
  }

  handleAuth = () => {
    return auth().then(({user, credential}) => {
      registerUser(user).then(response => {
        // Stores the given token in the browser storage
        window.localStorage.setItem('authToken', response.auth_token)
        this.setState({
          isAuthed: true,
          user: user,
        })
      })
    })
  }

  unAuthUser = () => {
    // Remove auth token from browser storage
    window.localStorage.clear()

    this.setState({
      isAuthed: false,
      user: null,
    })

    return logout()
  }

  handleLogout = event => {
    event.preventDefault()
    return this.unAuthUser()
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuthed: true,
          user: user,
        })
      }
    })
  }

  render() {
    return (
      <div className={container}>
        <Navigation
          isAuthed={this.state.isAuthed}
          onAuth={this.handleAuth}
          userInfo={this.state.user}
          onLogout={this.handleLogout}
        />
        <AuthedUserContext.Provider value={this.state}>
          <div className={innerContainer}>{this.props.children}</div>
        </AuthedUserContext.Provider>
      </div>
    )
  }
}

export default withRouter(MainContainer)
