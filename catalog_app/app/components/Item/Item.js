import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Title, Loading} from 'components'
import {fetchItem} from 'helpers/api'
import {description, actionButtons} from './styles.css'
import {listContainer, formLink} from '../../assets/styles/styles.css'
import {AuthedUserContext} from 'context/authedUserContext'

class Item extends Component {
  state = {
    item: null,
    isUserActionAllowed: false,
  }

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    fetchItem(this.props.match.params.id).then(resp => {
      this.setState({
        item: resp,
        isUserActionAllowed: resp.is_user_owner,
      })
    })
  }

  render() {
    return (
      <div className={listContainer}>
        {this.state.item ? (
          <section>
            <Title text={this.state.item.name} />
            <p className={description}>
              <b>{'Description: '}</b>
              {this.state.item.description}
            </p>
            {this.state.isUserActionAllowed && this.props.isAuthed ? (
              <div className={actionButtons}>
                <Link
                  className={formLink}
                  style={{margin: 0}}
                  to={'/edit/' + this.state.item.id}
                >
                  Edit
                </Link>
                <span> | </span>
                <Link
                  className={formLink}
                  style={{margin: 0}}
                  to={'/delete/' + this.state.item.id}
                >
                  Delete
                </Link>
              </div>
            ) : null}
          </section>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default props => (
  <AuthedUserContext.Consumer>
    {({isAuthed}) => <Item {...props} isAuthed={isAuthed} />}
  </AuthedUserContext.Consumer>
)
