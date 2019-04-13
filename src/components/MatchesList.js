import React, { Component, Fragment } from 'react';

import moment from 'moment';
import Helmet from 'react-helmet';

import ListGroup from 'react-bootstrap/ListGroup';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { formatDate, parseDate } from 'react-day-picker/moment';
import GameItem from './GameItem';

class MatchesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps === nextState;
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
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const { matches, leagues } = this.props;
    let matchesArray = [];

    leagues.forEach(league => {
      const leagueMatches = { league: { name: '', matches: [] } };
      leagueMatches.league.name = league;
      const leagueArray = matches.matches.filter(match => {
        return league.id === match.competition.id;
      });
      leagueMatches.league.matches = leagueArray;
      matchesArray.push(leagueMatches);
    });

    const { selectedDay } = this.state;
    console.log(matchesArray);
    return (
      <Fragment>
        <ListGroup lg="6" key={leagues.id}>
          <div className="InputFromTo" style={{ marginBottom: '20px' }}>
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
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        {leagues.league.name.area.name}:{' '}
                        {leagues.league.name.name}
                      </div>
                      <Link style={{ color: 'white' }} to="/compare/">
                        <Button variant="primary" style={{ height: '10px' }}>
                          Compare
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
                            home={match.homeTeam.name}
                            away={match.awayTeam.name}
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

export default MatchesList;
