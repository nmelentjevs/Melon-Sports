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
    leagues: [
      {
        key: 'americanfootball_nfl',
        active: true,
        group: 'American Football',
        details: 'US Football',
        title: 'NFL'
      },
      {
        key: 'aussierules_afl',
        active: true,
        group: 'Aussie Rules',
        details: 'Aussie Football',
        title: 'AFL'
      },
      {
        key: 'baseball_mlb',
        active: true,
        details: 'Major League Baseball 🇺🇸',
        group: 'Baseball',
        title: 'MLB'
      },
      {
        key: 'basketball_euroleague',
        active: true,
        group: 'Basketball',
        details: 'Basketball Euroleague',
        title: 'Basketball Euroleague'
      },
      {
        key: 'basketball_nba',
        active: true,
        group: 'Basketball',
        details: 'US Basketball',
        title: 'NBA'
      },
      {
        key: 'basketball_ncaab',
        active: true,
        group: 'Basketball',
        details: 'US College Basketball',
        title: 'NCAAB'
      },
      {
        key: 'cricket_odi',
        active: true,
        details: 'One Day Internationals',
        group: 'Cricket',
        title: 'One Day Internationals'
      },
      {
        key: 'cricket_test_match',
        active: true,
        details: 'International Test Matches',
        group: 'Cricket',
        title: 'Test Matches'
      },
      {
        key: 'icehockey_nhl',
        active: true,
        group: 'Ice Hockey',
        details: 'US Ice Hockey',
        title: 'NHL'
      },
      {
        key: 'mma_mixed_martial_arts',
        active: true,
        group: 'Mixed Martial Arts',
        details: 'Mixed Martial Arts',
        title: 'MMA'
      },
      {
        key: 'rugbyleague_nrl',
        active: true,
        group: 'Rugby League',
        details: 'Aussie Rugby League',
        title: 'NRL'
      },
      {
        key: 'rugbyunion_premiership_rugby',
        active: true,
        details: 'Gallagher Premiership',
        group: 'Rugby Union',
        title: 'Premiership Rugby'
      },
      {
        key: 'rugbyunion_super_rugby',
        active: true,
        group: 'Rugby Union',
        details: 'Vodafone Super Rugby',
        title: 'Super Rugby'
      },
      {
        key: 'soccer_australia_aleague',
        active: true,
        group: 'Soccer - Other',
        details: 'Aussie Soccer 🇦🇺',
        title: 'A-League'
      },
      {
        key: 'soccer_belgium_first_div',
        active: true,
        group: 'Soccer - Europe',
        details: 'Belgium Soccer 🇧🇪',
        title: 'Belgium First Div'
      },
      {
        key: 'soccer_denmark_superliga',
        active: true,
        group: 'Soccer - Europe',
        details: 'Danish Soccer 🇩🇰',
        title: 'Denmark Superliga'
      },
      {
        key: 'soccer_efl_champ',
        active: true,
        group: 'Soccer - UK',
        details: 'EFL Championship 🇬🇧',
        title: 'Championship'
      },
      {
        key: 'soccer_england_league1',
        active: true,
        group: 'Soccer - UK',
        details: 'EFL League 1 🇬🇧',
        title: 'League 1'
      },
      {
        key: 'soccer_england_league2',
        active: true,
        group: 'Soccer - UK',
        details: 'EFL League 2  🇬🇧',
        title: 'League 2'
      },
      {
        key: 'soccer_epl',
        active: true,
        group: 'Soccer - UK',
        details: 'English Premier League 🇬🇧',
        title: 'EPL'
      },
      {
        key: 'soccer_fa_cup',
        active: true,
        details: 'English FA Cup 🇬🇧',
        group: 'Soccer - UK',
        title: 'FA Cup'
      }
    ],
    active: {},
    sportRes: [
      {
        sport_key: 'soccer_spain_la_liga',
        sport_nice: 'La Liga - Spain',
        teams: ['Athletic Bilbao', 'Levante'],
        commence_time: 1554312667,
        home_team: 'Athletic Bilbao',
        sites: [
          {
            site_key: 'paddypower',
            site_nice: 'Paddy Power',
            last_update: 1554318668,
            odds: { h2h: [1.07, 81, 7.5] }
          },
          {
            site_key: 'betfair',
            site_nice: 'Betfair',
            last_update: 1554318667,
            odds: { h2h: [1.13, 95, 9] }
          },
          {
            site_key: 'unibet',
            site_nice: 'Unibet',
            last_update: 1554318668,
            odds: { h2h: [1.11, 71, 7.5] }
          },
          {
            site_key: 'sport888',
            site_nice: '888sport',
            last_update: 1554318706,
            odds: { h2h: [1.1, 91, 8] }
          },
          {
            site_key: 'ladbrokes',
            site_nice: 'Ladbrokes',
            last_update: 1554318665,
            odds: { h2h: [1.09, 81, 8.5] }
          },
          {
            site_key: 'smarkets',
            site_nice: 'Smarkets',
            last_update: 1554318704,
            odds: { h2h: [1.16, 100, 8.4] }
          }
        ],
        sites_count: 6
      },
      {
        sport_key: 'soccer_spain_la_liga',
        sport_nice: 'La Liga - Spain',
        teams: ['Eibar', 'Rayo Vallecano'],
        commence_time: 1554316247,
        home_team: 'Eibar',
        sites: [
          {
            site_key: 'unibet',
            site_nice: 'Unibet',
            last_update: 1554318668,
            odds: { h2h: [4.2, 1.89, 3.4] }
          },
          {
            site_key: 'smarkets',
            site_nice: 'Smarkets',
            last_update: 1554318704,
            odds: { h2h: [2.1, 4.9, 3.4] }
          },
          {
            site_key: 'ladbrokes',
            site_nice: 'Ladbrokes',
            last_update: 1554318665,
            odds: { h2h: [1, 1] }
          },
          {
            site_key: 'sport888',
            site_nice: '888sport',
            last_update: 1554318706,
            odds: { h2h: [4.2, 1.89, 3.4] }
          },
          {
            site_key: 'paddypower',
            site_nice: 'Paddy Power',
            last_update: 1554318668,
            odds: { h2h: [3.6, 1.91, 3.25] }
          },
          {
            site_key: 'betfair',
            site_nice: 'Betfair',
            last_update: 1554318667,
            odds: { h2h: [2.1, 4.6, 3.1] }
          }
        ],
        sites_count: 6
      },
      {
        sport_key: 'soccer_spain_la_liga',
        sport_nice: 'La Liga - Spain',
        teams: ['Celta Vigo', 'Huesca'],
        commence_time: 1554316259,
        home_team: 'Huesca',
        sites: [
          {
            site_key: 'unibet',
            site_nice: 'Unibet',
            last_update: 1554318668,
            odds: { h2h: [1.58, 6.25, 3.75] }
          },
          {
            site_key: 'smarkets',
            site_nice: 'Smarkets',
            last_update: 1554318704,
            odds: { h2h: [1.67, 7.2, 4.3] }
          },
          {
            site_key: 'ladbrokes',
            site_nice: 'Ladbrokes',
            last_update: 1554318665,
            odds: { h2h: [1.57, 5.5, 3.7] }
          },
          {
            site_key: 'sport888',
            site_nice: '888sport',
            last_update: 1554318706,
            odds: { h2h: [1.6, 6, 3.7] }
          },
          {
            site_key: 'paddypower',
            site_nice: 'Paddy Power',
            last_update: 1554318668,
            odds: { h2h: [1.53, 6, 3.5] }
          },
          {
            site_key: 'betfair',
            site_nice: 'Betfair',
            last_update: 1554318667,
            odds: { h2h: [1.66, 6.2, 4] }
          },
          {
            site_key: 'matchbook',
            site_nice: 'Matchbook',
            last_update: 1554318707,
            odds: { h2h: [1.66, 5.7, 3.96] }
          }
        ],
        sites_count: 7
      }
    ],
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
