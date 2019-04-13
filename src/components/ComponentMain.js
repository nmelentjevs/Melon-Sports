import React, { Component, Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Leagues from './Leagues';

class ComponentMain extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-3" style={{ textAlign: 'left' }}>
          <Container>
            <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
              <span style={{ fontSize: '18px', textTransform: 'uppercase' }}>
                <img
                  src={require('../img/hami_melon_39773.png')}
                  width="25px"
                  alt="melon"
                  style={{ paddingBottom: '10px' }}
                />{' '}
                Melon Sports
              </span>
            </a>
          </Container>
        </h1>
        <hr />
        <div>
          <Leagues />
        </div>
      </Fragment>
    );
  }
}

export default ComponentMain;
