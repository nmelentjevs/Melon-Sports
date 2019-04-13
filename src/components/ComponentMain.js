import React, { Component, Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Leagues from './Leagues';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

class ComponentMain extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
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
    this.child.current.updateDate(this.state.from, to);
    this.setState({ to }, this.showFromMonth);
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <Fragment>
        <Container>
          <div style={{ display: 'flex' }}>
            <h1 className="display-3" style={{ textAlign: 'left', flex: 1 }}>
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
            </h1>
            <div
              className="InputFromTo"
              style={{ flex: 1, marginTop: '45px', textAlign: 'right' }}
            >
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
        </Container>

        <hr />
        <div>
          <Leagues ref={this.child} />
        </div>
      </Fragment>
    );
  }
}

export default ComponentMain;
