import React from 'react'
import {CategoryList, Divider, ItemsList} from 'components'

export default function CategoryItems(props) {
  // Get category ID from route params
  const categoryId = parseInt(props.match.params.id, 10) || undefined

  const shouldDisplayCategory = categoryId === undefined

  return (
    <div>
      <CategoryList />
      <Divider />
      <ItemsList
        displayCategory={shouldDisplayCategory}
        categoryId={categoryId}
      />
    </div>
  )
}
