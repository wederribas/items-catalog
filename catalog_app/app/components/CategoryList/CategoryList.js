import React, {Component} from 'react'
import {Title} from 'components'
import {fetchCategories} from 'helpers/api'
import {listContainer, listWrapper, list} from '../../assets/styles/styles.css'

class CategoryList extends Component {
  state = {
    categories: null,
  }
  componentDidMount() {
    fetchCategories().then(resp => {
      this.setState({
        categories: resp.Categories,
      })
    })
  }
  render() {
    return (
      <div className={listContainer}>
        <Title text={'Categories'} />
        <div className={listWrapper}>
          {this.state.categories ? (
            <ul className={list}>
              {this.state.categories.map(obj => (
                <li key={obj.id}>{obj.name}</li>
              ))}
            </ul>
          ) : (
            <span>{'Loading'}</span>
          )}
        </div>
      </div>
    )
  }
}

export default CategoryList
