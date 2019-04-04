import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Leagues from './Leagues';

class ComponentMain extends Component {
  render() {
    return (
      <Container>
        <h1 className="display-3">
          Please choose a <span id="changetext">league</span>{' '}
          <span style={{ fontSize: '20px' }}>Melon Sports</span>
        </h1>
        <hr />
        <Leagues />
      </Container>
    );
  }
}

export default ComponentMain;
