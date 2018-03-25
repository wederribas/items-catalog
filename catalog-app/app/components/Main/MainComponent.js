import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Navigation} from 'components'
import {withRouter} from 'react-router-dom'
import {container, innerContainer} from './styles.css'
import {firebaseAuth} from 'config/constants'
import auth, {logout} from 'helpers/auth'

class MainContainer extends Component {
  state = {
    isAuthed: false,
    user: null,
  }
  handleAuth = () => {
    return auth().then(({user, credential}) => {
      this.setState({
        isAuthed: true,
        user: user,
      })
    })
  }
  handleLogout = event => {
    event.preventDefault()
    this.setState({
      isAuthed: false,
      user: null,
    })
    return logout()
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
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    )
  }
}

export default withRouter(MainContainer)
