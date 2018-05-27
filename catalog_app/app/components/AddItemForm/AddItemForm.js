import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Title} from 'components'
import {fetchCategories, addItem} from 'helpers/api'
import {formContainer} from './styles.css'
import {AuthedUserContext} from 'context/authedUserContext'

class AddItemForm extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    allCategories: null,
    isFetchingCategories: true,
    redirect: false,
  }

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    if (this.props.isAuthed) {
      fetchCategories().then(resp => {
        this.setState({
          allCategories: resp.Categories,
          isFetchingCategories: false,
        })
      })
    }
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

    const {name, description, category} = this.state

    addItem({name, description, category}).then(resp => {
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
        <Title text={'Edit Item'} />
        {this.state.isFetchingCategories ? (
          <span>Loading...</span>
        ) : (
          <form onSubmit={this.handleFormSubmit}>
            <p>
              <label>
                Name
                <br />
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </p>
            <p>
              <label>
                Description
                <br />
                <textarea
                  rows={5}
                  maxLength={1000}
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </p>
            <p>
              <label>
                Category
                <br />
                <select
                  name="category"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="" disabled />
                  {this.state.allCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
    {isAuthed => <AddItemForm isAuthed={isAuthed} />}
  </AuthedUserContext.Consumer>
)
