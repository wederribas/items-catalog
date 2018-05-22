import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Title} from 'components'
import {fetchLatestItems, fetchCategoryItems} from 'helpers/api'
import {list, listContainer, formLink} from '../../assets/styles/styles.css'
import {categoryLabel} from './styles.css'
import {AuthedUserContext} from 'context/authedUserContext'

/*
 * Renders the item category name
 */
function ItemCategory({name}) {
  return (
    <span className={categoryLabel}>
      <i> ({name})</i>
    </span>
  )
}

/*
 * Renders the list of items for a given category, or if category is null
 * then renders the latest inseted in the database, for all categories.
 * In the last scenario (latest items), the limit of items to be rendered
 * is set into the API call (see helpers/api.js - fetchLatestItems()).
 */
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

  /*
   * Triggers the items list fetching for a specific category
   */
  handleItemsFetching = categoryId => {
    return fetchCategoryItems(categoryId).then(resp => {
      this.setState({
        items: resp.Items,
        title: resp.Category.category_name + ' Items',
      })
    })
  }

  componentDidMount() {
    /*
     * If category is provided in props, then the component should
     * render this category's items. Otherwiser, renders the latest
     * created items.
     */
    if (this.props.categoryId) {
      this.handleItemsFetching(this.props.categoryId)
    } else {
      fetchLatestItems().then(resp => {
        this.setState({
          items: resp.Items,
        })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    /*
     * Listen to the category ID change. If true, then evaluates
     * if the category was given, if so then fetch the given
     * category items. Otherwise, fetch the latest items.
     */
    if (prevProps.categoryId !== this.props.categoryId) {
      if (this.props.categoryId) {
        this.handleItemsFetching(this.props.categoryId)
      } else {
        fetchLatestItems().then(resp => {
          this.setState({
            items: resp.Items,
            title: 'Latest Items',
          })
        })
      }
    }
  }

  render() {
    return (
      <div className={listContainer}>
        <AuthedUserContext.Consumer>
          {isAuthed =>
            isAuthed ? (
              <Link to={'/add-item'} className={formLink}>
                Add Item
              </Link>
            ) : null
          }
        </AuthedUserContext.Consumer>
        <Title text={this.state.title} />
        {this.state.items ? (
          <ul className={list}>
            {this.state.items.map(obj => (
              <li key={obj.id}>
                <Link to={'/items/' + obj.id}>
                  {obj.name}
                  {/* If listing the latest items,
                    * then display the category name. */}
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
