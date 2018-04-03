import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {MainComponent, Home, Item, CategoryItems} from 'components'

export default function getRoutes() {
  return (
    <Router>
      <MainComponent>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/items/:id(\d+)" component={Item} />
          <Route exact path="/categories/:id(\d+)" component={CategoryItems} />
        </Switch>
      </MainComponent>
    </Router>
  )
}
