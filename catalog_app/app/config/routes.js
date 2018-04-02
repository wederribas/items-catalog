import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {MainComponent, Home, Item} from 'components'

export default function getRoutes() {
  return (
    <Router>
      <MainComponent>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/items/:id(\d+)" component={Item} />
        </Switch>
      </MainComponent>
    </Router>
  )
}
