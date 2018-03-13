import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainComponent } from 'components';

export default function getRoutes() {
  return (
    <Router>
      <MainComponent>
        <Switch />
      </MainComponent>
    </Router>
  );
}
