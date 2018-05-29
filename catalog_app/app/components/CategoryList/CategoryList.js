import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Title, Loading} from 'components'
import {fetchCategories} from 'helpers/api'
import {listContainer, listWrapper, list} from '../../assets/styles/styles.css'

class CategoryList extends Component {
  state = {
    categories: null,
    isFetching: true,
  }
  componentDidMount() {
    fetchCategories().then(resp => {
      this.setState({
        categories: resp.Categories,
        isFetching: false,
      })
    })
  }
  render() {
    return (
      <div className={listContainer}>
        <Title text={'Categories'} />
        <div className={listWrapper}>
          {this.state.isFetching ? (
            <Loading />
          ) : this.state.categories.length ? (
            <ul className={list}>
              {this.state.categories.map(obj => (
                <li key={obj.id}>
                  <Link to={'/categories/' + obj.id}>{obj.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <span>{'No categories found'}</span>
          )}
        </div>
      </div>
    )
  }
}

export default CategoryList
