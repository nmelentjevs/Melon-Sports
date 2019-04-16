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
    return nextProps.eloLoading === false;
  }

  addFav = id => {
    this.props.addFav(id);
  };

  render() {
    console.log(this.props);
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const { matches, leagues, onmenuclick } = this.props;
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
        <ListGroup lg="6">
          <div
            className="InputFromTo"
            style={{
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                marginBottom: '5px',
                alignSelf: 'center',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%'
              }}
            >
              <div className="nav-items-main" style={{ margin: '0 50px' }}>
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
              <div style={{ flex: 1, marginLeft: '-10px' }}>
                <span
                  className="nav-items-secondary"
                  // TODO WRITE PROPER REFRESH OR FILTER FUNCTION TO SEE GAMES
                  // onClick={() => getGamesFromMenu(leagues.id)}
                >
                  Odds
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '5px' }}>
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

          {matchesArray.map(leagues => {
            return (
              <Fragment key={leagues.league.name.id}>
                {' '}
                {leagues.league.matches.length !== 0 ? (
                  <Fragment>
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
                        <Button
                          variant="primary"
                          style={{
                            fontSize: '.7rem',
                            padding: '0 1.5px',
                            marginBottom: '2px',
                            marginLeft: '2px',
                            background:
                              this.props.favourites === undefined ||
                              !this.props.favourites.includes(
                                leagues.league.name.code
                              )
                                ? 'none'
                                : 'gold',
                            color: 'black',
                            border: '1px black solid'
                          }}
                          onClick={() => {
                            this.addFav(leagues.league.name.code);
                          }}
                        >
                          {' '}
                          Fav
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
  leagues: PropTypes.array.isRequired,
  addFav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourites: state.favourites,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addFav }
)(MatchesList);
