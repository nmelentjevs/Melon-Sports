import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import moment from 'moment';
import ListGroup from 'react-bootstrap/ListGroup';

import GameItem from './GameItem';
import Button from 'react-bootstrap/Button';

class MatchesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eloMatches: []
    };
  }

  componentDidMount() {
    this.setState({ eloMatches: this.props.matches });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.eloLoading === false;
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const { matches, leagues } = this.props;
    let matchesArray = [];

    leagues.forEach(league => {
      const leagueMatches = { league: { name: '', matches: [] } };
      leagueMatches.league.name = league;
      const leagueArray = (matches.matches ? matches.matches : matches).filter(
        match => {
          return league.id === match.competition.id;
        }
      );
      leagueMatches.league.matches = leagueArray;
      matchesArray.push(leagueMatches);
    });

    return (
      <Fragment>
        <ListGroup lg="6" key={leagues.id}>
          {matchesArray.map(leagues => {
            return (
              <Fragment key={leagues.league.name.name}>
                {' '}
                {leagues.league.matches.length !== 0 ? (
                  <Fragment key={leagues.league.name.id}>
                    <ListGroup.Item
                      style={{
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '30px',
                        alignItems: 'center',
                        backgroundColor: '#ffcba4'
                      }}
                    >
                      <div style={{ fontSize: '1rem', fontWeight: '700' }}>
                        {leagues.league.name.area.name}:{' '}
                        {leagues.league.name.name}
                      </div>
                      <Link
                        style={{ color: 'white' }}
                        to={`/team/${leagues.league.name.id}/${
                          leagues.league.matches[0].homeTeam.name
                        }`}
                      >
                        <Button
                          variant="primary"
                          style={{
                            fontSize: '.7rem',
                            padding: '2.5px',
                            marginBottom: '2px',
                            background: 'none',
                            color: 'black',
                            border: 'none',
                            textDecoration: 'underline'
                          }}
                        >
                          Standings
                        </Button>
                      </Link>{' '}
                    </ListGroup.Item>

                    {leagues.league.matches.map(match => {
                      return (
                        <ListGroup.Item
                          as="li"
                          key={match.id - 1000}
                          style={{
                            fontSize: '13px',
                            padding: '2px'
                          }}
                        >
                          <GameItem
                            style={{
                              width: 'auto',
                              height: '50px',
                              display: 'block'
                            }}
                            key={match.id}
                            home={match.homeTeam}
                            away={match.awayTeam}
                            info={match}
                          />
                        </ListGroup.Item>
                      );
                    })}
                  </Fragment>
                ) : null}
              </Fragment>
            );
          })}
        </ListGroup>
      </Fragment>
    );
  }
}

MatchesList.propTypes = {
  leagues: PropTypes.array.isRequired
};

export default MatchesList;
