import React, {Component} from 'react'
import {CategoryList, Divider, ItemsList} from 'components'

class CategoryItems extends Component {
  render() {
    const categoryId = parseInt(this.props.match.params.id, 10)
    console.log(categoryId)
    return (
      <div>
        <CategoryList />
        <Divider />
        <ItemsList displayCategory={false} categoryId={categoryId} />
      </div>
    )
  }
}

export default CategoryItems
