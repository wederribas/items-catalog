import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Title, Loading} from 'components'
import {fetchCategories, fetchItem, addItem, editItem} from 'helpers/api'
import {formContainer} from './styles.css'
import {AuthedUserContext} from 'context/authedUserContext'

class ItemForm extends Component {
  state = {
    id: undefined,
    name: '',
    description: '',
    category: '',
    allCategories: null,
    categoriesFound: 0,
    isFetching: true,
    redirect: false,
  }

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    if (this.props.isAuthed) {
      if (this.props.location.pathname.indexOf('edit') > -1) {
        fetchItem(this.props.match.params.id).then(resp => {
          this.setState({
            id: resp.id,
            name: resp.name,
            description: resp.description,
            category: resp.category_id,
            redirect: !resp.is_user_owner,
          })
        })
      }

      fetchCategories().then(resp => {
        this.setState({
          allCategories: resp.Categories,
          isFetching: false,
          categoriesFound: resp.Categories.length,
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

    const {id, name, description, category} = this.state

    const callback = resp => {
      if (resp.status === 'success') {
        this.setState({
          redirect: true,
        })
      }
    }

    if (this.props.location.pathname.indexOf('edit') > -1) {
      editItem({id, name, description, category}).then(resp => callback(resp))
    } else {
      addItem({name, description, category}).then(resp => callback(resp))
    }
  }

  render() {
    if (
      this.state.redirect ||
      !this.props.isAuthed ||
      !this.state.categoriesFound
    ) {
      return <Redirect to="/" />
    }

    return (
      <div className={formContainer}>
        <Title text={'Edit Item'} />
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
    {isAuthed => <ItemForm {...props} isAuthed={isAuthed} />}
  </AuthedUserContext.Consumer>
)
