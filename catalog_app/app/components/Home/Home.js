import React from 'react'
import {CategoryList, ItemsList, Divider} from 'components'

export default function Home() {
  return (
    <div>
      <CategoryList />
      <Divider />
      <ItemsList />
    </div>
  )
}
