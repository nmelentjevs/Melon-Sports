import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Leagues from './Leagues';

class ComponentMain extends Component {
  render() {
    return (
      <Container>
        <h1 className="display-3">
          Please choose a <span id="changetext">league</span>{' '}
          <span style={{ fontSize: '18px', textTransform: 'uppercase' }}>
            <img
              src={require('../img/hami_melon_39773.png')}
              width="25px"
              alt="melon"
              style={{ paddingBottom: '10px' }}
            />{' '}
            Melon Sports
          </span>
        </h1>
        <hr />
        <div>
          <Leagues />
        </div>
      </Container>
    );
  }
}

export default ComponentMain;
