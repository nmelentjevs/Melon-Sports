import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Leagues from './Leagues';

class ComponentMain extends Component {
  render() {
    return (
      <Container>
        <h1 className="display-3">
          Please choose a <span id="changetext">league</span>{' '}
        </h1>
        <hr />
        <Leagues />
      </Container>
    );
  }
}

export default ComponentMain;
