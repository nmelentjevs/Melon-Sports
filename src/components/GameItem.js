import React, { Component } from 'react';

import { Transition, animated } from 'react-spring/renderprops';
import Info from './Info';

export class GameItem extends Component {
  state = {
    showInfo: false
  };

  toggle = e => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  render() {
    const { teams, info } = this.props;
    return (
      <div className="match-card" onClick={this.toggle}>
        <h5
          style={{
            display: 'inline-block',
            cursor: 'pointer'
          }}
        >
          {teams[0]} vs {teams[1]}
        </h5>

        <Transition
          native
          items={this.state.showInfo}
          from={{ opacity: 0, display: 'none' }}
          enter={{ opacity: 1, display: 'block' }}
          leave={{ opacity: 0, display: 'none' }}
        >
          {show =>
            show &&
            (props => (
              <animated.div style={props}>
                <Info info={info} />
              </animated.div>
            ))
          }
        </Transition>
      </div>
    );
  }
}

export default GameItem;
