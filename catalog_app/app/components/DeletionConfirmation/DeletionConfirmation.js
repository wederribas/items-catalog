import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Title} from 'components'
import {fetchItem, deleteItem} from 'helpers/api'
import {container} from './styles.css'
import {listContainer} from '../../assets/styles/styles.css'
import {AuthedUserContext} from 'context/authedUserContext'

class DeletionConfirmation extends Component {
  state = {
    item: null,
    redirect: false,
  }

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    fetchItem(this.props.match.params.id).then(resp => {
      this.setState({
        item: resp,
        redirect: !resp.is_user_owner,
      })
    })
  }

  handleSubmit = () => {
    deleteItem(this.state.item.id).then(resp => {
      if (resp.status == 'success') {
        this.setState({
          redirect: true,
        })
      }
    })
  }

  render() {
    if (this.state.redirect || !this.props.isAuthed) {
      return <Redirect to="/" />
    }

    return (
      <div className={listContainer}>
        {this.state.item ? (
          <section className={container}>
            <Title text={'Delete Item'} />
            <p>
              Are you sure you want to delete the item{' '}
              <b>{this.state.item.name}</b>?
            </p>
            <button onClick={this.handleSubmit}>Submit</button>
          </section>
        ) : (
          <span>{'Loading'}</span>
        )}
      </div>
    )
  }
}

export default props => (
  <AuthedUserContext.Consumer>
    {isAuthed => <DeletionConfirmation {...props} isAuthed={isAuthed} />}
  </AuthedUserContext.Consumer>
)
