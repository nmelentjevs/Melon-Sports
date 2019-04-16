import React, { Component } from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';

import Team from './components/Team';
import NavbarMain from '../src/components/common/NavbarMain';

// Bootstrap items

import ComponentMain from './components/ComponentMain';

// Components

import Compare from './components/Compare';
import News from './components/news/News';

class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div className="App">
          <NavbarMain />
          <Switch>
            <Route exact path="/" component={ComponentMain} />
          </Switch>
          <Switch>
            <Route exact path="/team/:league/:name" component={Team} />
          </Switch>
          <Switch>
            <Route exact path="/compare/:name1/:name2" component={Compare} />
          </Switch>
          <Switch>
            <Route exact path="/news/:category" component={News} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
