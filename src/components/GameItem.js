import React, { Component, Fragment } from 'react';

import { Transition, animated } from 'react-spring/renderprops';
import Info from './Info';
import Moment from 'react-moment';
class GameItem extends Component {
  state = {
    showInfo: false
  };

  toggle = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  render() {
    const { home, away, info } = this.props;
    return (
      <Fragment>
        <div
          className="match-card"
          style={{ display: 'flex' }}
          onClick={this.toggle}
        >
          <div className="home_team" style={{ flex: 1 }}>
            {home}
          </div>
          <div
            className="score"
            style={{
              margin: '0 10px',
              alignSelf: 'center',
              flex: 1
            }}
          >
            <button
              className="preview-game"
              style={{ borderRadius: '20px', height: '20px' }}
            >
              Preview
            </button>
          </div>
          <div className="home_team" style={{ flex: 1 }}>
            {' '}
            {away}
          </div>
          {/* <div style={{ flex: 1 }}>
            <Moment format="DD/MM/YYYY"> {info.utcDate}</Moment>
          </div> */}
        </div>
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
                <Info home={home} away={away} id={info.competition.id} />
              </animated.div>
            ))
          }
        </Transition>
      </Fragment>
    );
  }
}

export default GameItem;
