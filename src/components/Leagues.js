import React, { Component } from 'react';
import axios from 'axios';
import keys from '../config/keys';

import { Transition, animated } from 'react-spring/renderprops';
import { Spring } from 'react-spring/renderprops';
import Spinner from 'react-bootstrap/Spinner';
import LeagueList from './LeagueList';
import MatchesList from './MatchesList';

class Leagues extends Component {
  state = {
    leagues: [],
    active: {},
    sportRes: [],
    filtered: [],
    showGames: false,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('https://api.the-odds-api.com/v3/sports', {
        params: {
          api_key: keys.oddsKey
        }
      })
      .then(res => {
        console.log(`Successfully got ${res.data.data.length} sports.`);
        console.log(res.data.data);
        this.setState({
          leagues: res.data.data,
          filtered: res.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error status', error.response.status);
        console.log(error.response.data);
      });
    console.log(this.state.filtered);
    console.log(this.state.leagues);
    this.setState({ filtered: this.state.leagues });
  }

  filterList = e => {
    let updatedList = this.state.leagues;
    updatedList = updatedList.filter(item => {
      return item.key.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filtered: updatedList });
  };

  getGamesFromSport = league => {
    let sport_key = league;
    axios
      .get('https://api.the-odds-api.com/v3/odds', {
        params: {
          api_key: keys.oddsKey,
          sport: sport_key,
          region: 'uk', // uk | us | au
          mkt: 'h2h' // h2h | spreads | totals
        }
      })
      .then(res => {
        // odds_json['data'] contains a list of live and
        //   upcoming events and odds for different bookmakers.
        // Events are ordered by start time (live events are first)
        this.setState({ sportRes: res.data.data });
        console.log(
          `Successfully got ${res.data.data.length} events`,
          `Here's the first event:`
        );
        console.log(JSON.stringify(res.data.data[0]));
        // Check your usage
        console.log();
        console.log('Remaining requests', res.headers['x-requests-remaining']);
        console.log('Used requests', res.headers['x-requests-used']);
      })
      .catch(error => {
        console.log('Error status', error.res.status);
        console.log(error.res.data);
      });
  };
  onClick = e => {
    const elems = document.querySelector('.active');
    const prevState = this.state.active;
    if (elems !== null) {
      elems.classList.remove('active');
    } else {
      e.target.classList.add('active');
    }
    if (e.target.tagName === 'LI' || e.target.tagName === 'h5') {
      e.target.classList.add('active');
      const sport_key = e.target.getAttribute('param');
      this.setState({ active: sport_key });
      prevState === sport_key
        ? this.setState({ showGames: !this.state.showGames })
        : this.setState({ showGames: true });
      this.getGamesFromSport(sport_key);
    } else {
      e.target.parentElement.classList.add('active');
      const sport_key = e.target.parentElement.getAttribute('param');
      this.setState({ active: sport_key });
      prevState === sport_key
        ? this.setState({ showGames: !this.state.showGames })
        : this.setState({ showGames: true });
      this.getGamesFromSport(sport_key);
    }
    this.state.showGames
      ? (document.getElementById('changetext').innerHTML = 'match')
      : (document.getElementById('changetext').innerHTML = 'league');
    this.setState({ filtered: this.state.leagues });
  };

  animateLeagueList = params => {};

  // TODO
  // ON LIST ITEM CLICK  => ANIMATE IT TO LEFT SIDE
  // => AND MAKE AN ARROW FROM IT TO THE NEXT LIST OF GAMES
  // => ON GAME CARD CLICK
  // => FOCUS ON IT ( ISOLATE MODE ) DROPDOWN ODDS

  render() {
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: this.state.showGames ? '1fr 1fr' : '1fr',
      gridGap: '20px'
    };

    if (this.state.loading) {
      let content = (
        <div>
          <Spinner animation="grow" /> <Spinner animation="grow" />{' '}
          <Spinner animation="grow" />
        </div>
      );
      return content;
    } else {
      let content = (
        <div>
          {!this.state.showGames ? (
            <div className="filter-list">
              <form>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search"
                    onChange={this.filterList}
                  />
                </fieldset>
              </form>
            </div>
          ) : (
            <div />
          )}

          <Spring
            from={{ opacity: 0, marginLeft: -500 }}
            to={{ opacity: 1, marginLeft: 0 }}
          >
            {props => (
              <div style={props}>
                <div className="list-grid" style={gridStyle}>
                  <LeagueList
                    leagues={this.state.filtered}
                    onclick={this.onClick}
                  />
                  <Transition
                    native
                    items={this.state.showGames}
                    from={{ opacity: 0, display: 'none' }}
                    enter={{ opacity: 1, display: 'block' }}
                    leave={{ opacity: 0, display: 'none' }}
                  >
                    {show =>
                      show &&
                      (props => (
                        <animated.div style={props}>
                          <MatchesList sportRes={this.state.sportRes} />
                        </animated.div>
                      ))
                    }
                  </Transition>
                </div>
              </div>
            )}
          </Spring>
        </div>
      );
      return content;
    }
  }
}

export default Leagues;
