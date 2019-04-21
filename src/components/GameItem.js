import React, { Component, Fragment } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { Transition, animated } from 'react-spring/renderprops';
import Info from './Info';
import moment from 'moment';
import { Link } from 'react-router-dom';
class GameItem extends Component {
  state = {
    showInfo: false,
    info: []
  };

  toggle = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  componentDidMount() {
    this.setState({ info: this.props.info });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.info !== nextProps.info) {
  //     console.log('did update');
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { home, away, info } = this.props;

    const eloChange = (el1, el2, result) => {
      const maxRating = 20;
      const eloDiff = el2 - el1;
      const percentage = 1 / (1 + Math.pow(10, eloDiff / 400));

      if (result === 'win') {
        return '+' + Math.round(maxRating * (1 - percentage));
      } else if (result === 'loss') {
        return Math.round(maxRating * (0 - percentage));
      } else if (result === 'draw') {
        return Math.round(maxRating * (0.5 - percentage));
      }
    };
    return (
      <Fragment>
        <div
          className="match-card"
          onClick={this.toggle}
          style={{ display: 'flex' }}
        >
          <div
            className="match-card-"
            style={{ flex: 1, borderRight: '1px black dashed' }}
          >
            {moment(info.utcDate).format('DD/MM/YYYY') ===
            moment(new Date()).format('DD/MM/YYYY') ? (
              <div> {moment(info.utcDate).format('HH:mm')}</div>
            ) : moment(info.utcDate).format('DD/MM/YYYY') ===
              moment(new Date())
                .add(1, 'days')
                .format('DD/MM/YYYY') ? (
              <div style={{ fontSize: '.65rem' }}> Tomorrow </div>
            ) : moment(info.utcDate).format('DD/MM/YYYY') ===
              moment(new Date())
                .add(-1, 'days')
                .format('DD/MM/YYYY') ? (
              <div> Yesterday </div>
            ) : (
              <div> {moment(info.utcDate).format('DD/MM')}</div>
            )}
          </div>
          <div className="match-card-info" style={{ display: 'flex', flex: 9 }}>
            <div
              className="home_team"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              <Link
                to={`/team/${info.competition.id}/${home.name}`}
                style={{ color: 'black' }}
              >
                {home.name} (
                {home.elo === undefined ? (
                  <Spinner
                    animation="grow"
                    variant="warning"
                    style={{ width: '10px', height: '10px' }}
                  />
                ) : (
                  <div style={{ fontSize: '10px', display: 'inline-block' }}>
                    {' '}
                    {home.elo}{' '}
                    {moment(info.utcDate).format('YYYY-MM-DD:HH:mm') <
                    moment().format('YYYY-MM-DD:HH:mm') ? (
                      <span
                        style={{
                          color:
                            info.score.winner === 'HOME_TEAM'
                              ? 'green'
                              : info.score.winner === 'AWAY_TEAM'
                              ? 'red'
                              : 'orange'
                        }}
                      >
                        {' '}
                        {eloChange(
                          home.elo,
                          away.elo,
                          info.score.winner === 'HOME_TEAM'
                            ? 'win'
                            : info.score.winner === 'AWAY_TEAM'
                            ? 'loss'
                            : 'draw'
                        )}{' '}
                      </span>
                    ) : null}
                  </div>
                )}
                )
              </Link>
            </div>

            <div
              className="score"
              style={{
                margin: '0 5px',
                alignSelf: 'center',
                border: 'none'
              }}
            >
              <button
                className="preview-game"
                style={{
                  borderRadius: '20px',
                  height: '20px',
                  border: 'none',
                  color:
                    info.status === 'IN_PLAY' || info.status === 'PAUSED'
                      ? 'red'
                      : 'black'
                }}
              >
                {info.score.winner ? (
                  <div>
                    {' '}
                    {info.score.fullTime.homeTeam}:
                    {info.score.fullTime.awayTeam}
                  </div>
                ) : (
                  <div> Info </div>
                )}
              </button>
            </div>
            <div className="home_team" style={{ flex: 1 }}>
              <Link
                to={`/team/${info.competition.id}/${away.name}`}
                style={{ color: 'black' }}
              >
                {away.name} (
                {away.elo === undefined ? (
                  <Spinner
                    variant="warning"
                    animation="grow"
                    style={{ width: '10px', height: '10px' }}
                  />
                ) : (
                  <div style={{ fontSize: '10px', display: 'inline-block' }}>
                    {away.elo}{' '}
                    {moment(info.utcDate).format('YYYY-MM-DD:HH:mm') <
                    moment().format('YYYY-MM-DD:HH:mm') ? (
                      <span
                        style={{
                          color:
                            info.score.winner === 'HOME_TEAM'
                              ? 'red'
                              : info.score.winner === 'AWAY_TEAM'
                              ? 'green'
                              : 'orange'
                        }}
                      >
                        {' '}
                        {eloChange(
                          away.elo,
                          home.elo,
                          info.score.winner === 'HOME_TEAM'
                            ? 'loss'
                            : info.score.winner === 'AWAY_TEAM'
                            ? 'win'
                            : 'draw'
                        )}
                      </span>
                    ) : null}
                  </div>
                )}
                )
              </Link>
            </div>
            {/* <div style={{ flex: 1 }}>
            <Moment format="DD/MM/YYYY"> {info.utcDate}</Moment>
          </div> */}
          </div>
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
                <Info
                  home={home}
                  away={away}
                  info={this.state.info}
                  predict={this.state.showInfo}
                />
              </animated.div>
            ))
          }
        </Transition>
      </Fragment>
    );
  }
}

export default GameItem;
