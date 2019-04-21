import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFav } from '../actions/dataActions';

import moment from 'moment';
import ListGroup from 'react-bootstrap/ListGroup';

import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import GameItem from './GameItem';
import Button from 'react-bootstrap/Button';

class MatchesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eloMatches: [],
      from: undefined,
      to: undefined
    };
  }
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange = from => {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  };
  handleToChange = to => {
    this.props.updateDate(this.state.from, to);
    this.setState({ to }, this.showFromMonth);
  };

  componentDidMount() {
    this.setState({ eloMatches: this.props.matches });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.eloLoading === false ||
      nextProps.favourites !== this.props.favourites
    );
  }

  addFav = id => {
    this.props.addFav(id);
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const { matches, leagues, onmenuclick, favourites } = this.props;
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
    let favArray = [];
    matchesArray.map((item, index) => {
      if (favourites.includes(item.league.name.code)) {
        let a = matchesArray.splice(index, 1);
        favArray.unshift(a[0]);
      }
      return null;
    });
    favArray.sort((a, b) => {
      if (a.league.name.area < b.league.name.area) {
        return -1;
      }
      if (a.league.name.area > b.league.name.area) {
        return 1;
      }
      return 0;
    });
    favArray.map(item => matchesArray.unshift(item));
    console.log(matchesArray);
    return (
      <Fragment>
        <ListGroup
          lg="6"
          style={{
            background: 'transparent'
          }}
        >
          <div
            className="InputFromTo"
            style={{
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'space-between',
              color: 'black',
              padding: '5px 0',
              marginBottom: '15px',
              background: 'whitesmoke',
              gridArea: 'menu'
            }}
          >
            <div
              style={{
                marginTop: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%'
              }}
            >
              <div
                className="nav-items-main"
                style={{
                  margin: '0 50px 0 20px',
                  marginBottom: '2.5px',
                  padding: '0 10px'
                }}
              >
                <span>Browse Games</span>
              </div>
              <div style={{ flex: 1, marginRight: '5px' }}>
                <span
                  className="nav-items-secondary"
                  // TODO WRITE PROPER REFRESH OR FILTER FUNCTION TO SEE GAMES
                  onClick={() =>
                    onmenuclick(
                      [2021, 2001, 2015, 2002, 2019, 2014],
                      'FINISHED'
                    )
                  }
                >
                  Finished
                </span>
              </div>
              <div style={{ flex: 1, marginRight: '5px' }}>
                <span
                  className="nav-items-secondary"
                  // TODO WRITE PROPER REFRESH OR FILTER FUNCTION TO SEE GAMES
                  onClick={() =>
                    onmenuclick(
                      [2021, 2001, 2015, 2002, 2019, 2014],
                      'SCHEDULED'
                    )
                  }
                >
                  Today
                </span>
              </div>
              <div style={{ flex: 1, marginRight: '5px' }}>
                <span
                  className="nav-items-secondary"
                  // TODO WRITE PROPER REFRESH OR FILTER FUNCTION TO SEE GAMES
                  // onClick={() => getGamesFromMenu(leagues.id)}
                >
                  Odds
                </span>
              </div>
            </div>
            <div style={{ margin: '2.5px 10px 0 0' }}>
              <DayPickerInput
                value={from}
                placeholder="From"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 2,
                  onDayClick: () => this.to.getInput().focus()
                }}
                onDayChange={this.handleFromChange}
              />{' '}
              —{' '}
              <span className="InputFromTo-to">
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="To"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 2
                  }}
                  onDayChange={this.handleToChange}
                />
              </span>
              <Helmet>
                <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
              </Helmet>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridGap: '30px'
            }}
          >
            {matchesArray.map(leagues => {
              return (
                <Fragment key={leagues.league.name.id}>
                  {leagues.league.matches.length !== 0 ? (
                    <div
                      className="matches"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '550px auto',
                        gridGap: '5px'
                      }}
                    >
                      <div>
                        <ListGroup.Item
                          style={{
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: '35px',
                            alignItems: 'center',
                            gridArea: 'item',
                            backgroundColor: !favourites.includes(
                              leagues.league.name.code
                            )
                              ? '#d6d6d6'
                              : '#eadaa2'
                          }}
                        >
                          <div style={{ fontSize: '1rem', fontWeight: '700' }}>
                            {leagues.league.name.area.name}:{' '}
                            {leagues.league.name.name}
                          </div>
                          <div>
                            <Link
                              style={{ color: 'white' }}
                              to={`/team/${leagues.league.name.id}/${
                                leagues.league.matches[0].homeTeam.name
                              }`}
                            >
                              <Button
                                variant="primary"
                                style={{
                                  fontSize: '.8rem',
                                  padding: '0 2.5px',
                                  background: 'none',
                                  color: 'black',
                                  border: 'none',
                                  marginBottom: '1px'
                                  // textDecoration: 'underline'
                                }}
                              >
                                Standings
                              </Button>
                            </Link>{' '}
                            <Button
                              variant="primary"
                              style={{
                                fontSize: '.9rem',
                                padding: '0 2.5px',
                                marginLeft: '2px',
                                background: 'none',
                                marginBottom: '3px',
                                color: !favourites.includes(
                                  leagues.league.name.code
                                )
                                  ? 'black'
                                  : 'orange',
                                border: 'none'
                              }}
                              onClick={() => {
                                this.addFav(leagues.league.name.code);
                              }}
                            >
                              {' '}
                              {!favourites.includes(
                                leagues.league.name.code
                              ) ? (
                                <i className="far fa-star" />
                              ) : (
                                <i className="fas fa-star" />
                              )}
                            </Button>
                          </div>
                        </ListGroup.Item>

                        {leagues.league.matches.map(match => {
                          return (
                            <ListGroup.Item
                              as="li"
                              key={match.id - 1000}
                              style={{
                                fontSize: '13px',
                                padding: '2px',
                                minHeight: '25px'
                              }}
                            >
                              <GameItem
                                style={{
                                  width: 'auto',
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
                      </div>
                      <div
                        style={{
                          background: 'transparent',
                          height: 'auto',
                          color: 'black'
                        }}
                        className="aside-menu"
                      >
                        <div
                          className="aside-item"
                          style={{ background: '#f8d5c6' }}
                        >
                          {leagues.league.name.name}
                        </div>
                        <div
                          className="aside-item"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#f8eie7'
                          }}
                        >
                          <div
                            className="aside-item-name"
                            style={{ marginTop: '10px' }}
                          >
                            {' '}
                            <h5 style={{ fontSize: '13px' }}>
                              {' '}
                              Current Matchday{' '}
                            </h5>
                            <p style={{ fontSize: '50px' }}>
                              {' '}
                              {
                                leagues.league.name.currentSeason
                                  .currentMatchday
                              }{' '}
                            </p>
                          </div>
                        </div>
                        <div
                          className="aside-item"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            background: '#f8eie7'
                          }}
                        >
                          <p style={{ marginTop: '15px' }}>
                            {' '}
                            {leagues.league.name.currentSeason.startDate}{' '}
                          </p>
                          <p>{leagues.league.name.currentSeason.endDate}</p>{' '}
                        </div>

                        <div
                          className="aside-item"
                          style={{ background: '#f8d5c6' }}
                        >
                          {' '}
                          Something{' '}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </ListGroup>
      </Fragment>
    );
  }
}

MatchesList.propTypes = {
  leagues: PropTypes.array.isRequired,
  addFav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourites: state.data.favourites,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addFav }
)(MatchesList);
