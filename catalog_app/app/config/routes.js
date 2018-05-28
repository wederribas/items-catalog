import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
  MainComponent,
  Item,
  CategoryItems,
  ItemForm,
  DeletionConfirmation,
} from 'components'

export default function getRoutes() {
  return (
    <Router>
      <MainComponent>
        <Switch>
          <Route exact path="/" component={CategoryItems} />
          <Route exact path="/items/:id(\d+)" component={Item} />
          <Route exact path="/categories/:id(\d+)" component={CategoryItems} />
          <Route exact path="/add-item" component={ItemForm} />
          <Route
            exact
            path="/delete/:id(\d+)"
            component={DeletionConfirmation}
          />
          <Route exact path="/edit/:id(\d+)" component={ItemForm} />
        </Switch>
      </MainComponent>
    </Router>
  )
}
