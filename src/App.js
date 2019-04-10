import React, { Component } from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';

import Team from './components/Team';

// Bootstrap items

import ComponentMain from './components/ComponentMain';

// Components

import Compare from './components/Compare';

class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ComponentMain} />
          </Switch>
          <Switch>
            <Route exact path="/team/:league/:name" component={Team} />
          </Switch>
          <Switch>
            <Route exact path="/compare/:name1/:name2" component={Compare} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
