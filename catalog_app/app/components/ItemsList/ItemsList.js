import React, {Component} from 'react'
import {Title} from 'components'
import {fetchLatestItems} from 'helpers/api'
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
  }
  componentDidMount() {
    fetchLatestItems().then(resp => {
      this.setState({
        items: resp.Items,
      })
    })
  }
  render() {
    return (
      <div className={listContainer}>
        <Title text={'Latest Items'} />
        {this.state.items ? (
          <ul className={list}>
            {this.state.items.map(obj => (
              <li key={obj.id}>
                {obj.name}
                <ItemCategory name={obj.category_name} />
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
