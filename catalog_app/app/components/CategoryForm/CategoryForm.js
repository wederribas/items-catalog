import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Title, Loading} from 'components'
import {addCategory} from 'helpers/api'
import {formContainer} from '../../assets/styles/styles.css'
import {AuthedUserContext} from 'context/authedUserContext'

class CategoryForm extends Component {
  state = {
    name: '',
    redirect: false,
  }

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  handleInputChange = event => {
    const target = event.target
    const name = target.name

    this.setState({
      [name]: target.value,
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()

    const {name} = this.state

    addCategory({name}).then(resp => {
      if (resp.status === 'success') {
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
      <div className={formContainer}>
        <Title text={'Edit Category'} />
        {this.state.isFetching ? (
          <Loading />
        ) : (
          <form onSubmit={this.handleFormSubmit}>
            <p>
              <label>
                Name
                <br />
                <input
                  type="text"
                  name="name"
                  maxLength={20}
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </p>
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    )
  }
}

export default props => (
  <AuthedUserContext.Consumer>
    {isAuthed => <CategoryForm {...props} isAuthed={isAuthed} />}
  </AuthedUserContext.Consumer>
)
