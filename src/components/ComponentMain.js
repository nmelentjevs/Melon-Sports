import React, { Component, Fragment } from 'react';

import Leagues from './Leagues';

class ComponentMain extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ marginTop: '20px' }}>
          <Leagues />
        </div>
      </Fragment>
    );
  }
}

export default ComponentMain;
