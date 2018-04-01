import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {MainComponent, CategoryList, ItemsList, Divider} from 'components'

export default function getRoutes() {
  return (
    <Router>
      <MainComponent>
        <CategoryList />
        <Divider />
        <ItemsList />
        <Switch />
      </MainComponent>
    </Router>
  )
}
