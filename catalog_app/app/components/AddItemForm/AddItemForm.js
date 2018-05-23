import React, {Component} from 'react'
import {Title} from 'components'
import {fetchCategories} from 'helpers/api'
import {formContainer} from './styles.css'

class AddItemForm extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    allCategories: null,
    isFetchingCategories: true,
  }

  componentDidMount() {
    fetchCategories().then(resp => {
      this.setState({
        allCategories: resp.Categories,
        isFetchingCategories: false,
      })
    })
  }

  handleInputChange = event => {
    const target = event.target
    const name = target.name

    this.setState({
      [name]: target.value,
    })
  }

  render() {
    return (
      <div className={formContainer}>
        <Title text={'Edit Item'} />
        {this.state.isFetchingCategories ? (
          <span>Loading...</span>
        ) : (
          <form>
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
                >
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

export default AddItemForm
