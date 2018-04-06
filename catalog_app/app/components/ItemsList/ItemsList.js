import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Title} from 'components'
import {fetchLatestItems, fetchCategoryItems} from 'helpers/api'
import {list, listContainer} from '../../assets/styles/styles.css'
import {categoryLabel} from './styles.css'

function ItemCategory({name}) {
  return (
    <span className={categoryLabel}>
      <i> ({name})</i>
    </span>
  )
}

class ItemsList extends Component {
  state = {
    items: null,
    title: 'Latest Items',
  }
  static propTypes = {
    displayCategory: PropTypes.bool.isRequired,
    categoryId: PropTypes.number,
  }
  static defaultProps = {
    displayCategory: true,
  }
  handleItemsFetching = (categoryId, called) => {
    console.log('Who called', called)
    return fetchCategoryItems(categoryId).then(resp => {
      console.log('Function', resp)
      this.setState({
        items: resp.Items,
        title: resp.Category.category_name + ' Items',
      })
    })
  }
  componentDidUpdate() {
    this.handleItemsFetching(this.props.categoryId, 'didUpdate')
  }
  componentDidMount() {
    if (this.props.categoryId) {
      this.handleItemsFetching(this.props.categoryId, 'didMount')
    } else {
      fetchLatestItems().then(resp => {
        this.setState({
          items: resp.Items,
        })
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should update categoryID', this.props.categoryId)
    console.log('Should update next', nextProps.categoryId)
    if (this.props.categoryId !== nextProps.categoryId) {
      return true
    }

    return false
  }
  render() {
    return (
      <div className={listContainer}>
        <Title text={this.state.title} />
        {this.state.items ? (
          <ul className={list}>
            {this.state.items.map(obj => (
              <li key={obj.id}>
                <Link to={'/items/' + obj.id}>
                  {obj.name}
                  {this.props.displayCategory ? (
                    <ItemCategory name={obj.category_name} />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span>{'Loading'}</span>
        )}
      </div>
    )
  }
}

export default ItemsList
