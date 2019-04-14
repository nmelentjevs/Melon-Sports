import React, { Component, Fragment } from 'react';

import Leagues from './Leagues';

class ComponentMain extends Component {
  render() {
    return (
      <Fragment>
        <hr />
        <div>
          <Leagues ref={this.child} />
        </div>
      </Fragment>
    );
  }
}

export default ComponentMain;
