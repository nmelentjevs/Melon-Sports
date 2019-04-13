import React, { Component } from 'react';
import axios from 'axios';
import keys from '../config/keys';
import moment from 'moment';

import { Transition, animated } from 'react-spring/renderprops';
import { Spring } from 'react-spring/renderprops';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import LeagueList from './LeagueList';
import MatchesList from './MatchesList';

class Leagues extends Component {
  state = {
    leagues: [],
    active: 2021,
    matches: [],
    filtered: [],
    showGames: false,
    loading: false,
    gamesLoading: false
  };

  componentDidMount() {
    const needed = [];
    this.setState({ loading: true });
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    axios
      .get('https://api.football-data.org/v2/competitions', {
        headers
      })
      .then(async res => {
        this.setState({
          leagues: res.data,
          filtered: res.data,
          loading: false
        });
        console.log(res.data);
        const arrayOfIds = res.data.competitions
          .filter(item => {
            return (
              item.code === 'PL' ||
              item.code === 'FL1' ||
              item.code === 'BL1' ||
              item.code === 'SA' ||
              item.code === 'PD'
            );
          })
          .map(item => item.id);
        await needed.push(arrayOfIds);
        axios
          .get(
            `https://api.football-data.org/v2/matches/?competitions=${needed}&dateFrom=2019-04-12&dateTo=2019-04-22`,
            {
              headers
            }
          )
          .then(res => {
            this.setState({ matches: res.data, gamesLoading: false });
            console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log('Error status', error.response);
        console.log(error.response);
      });
    this.setState({ gamesLoading: true });
  }

  updateDate = (dateFr, dateT) => {
    // TODO FIX DATES LOL
    let dateFrom = moment(dateFr);
    const dateTo = moment(dateT);
    let newDateTo;
    const difference = dateTo.diff(dateFrom, 'days');
    console.log(difference);
    if (difference > 10) {
      newDateTo = dateFrom.add(9, 'days');
    }
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    const needed = [];
    const arrayOfIds = this.state.leagues.competitions
      .filter(item => {
        return (
          item.code === 'PL' ||
          item.code === 'FL1' ||
          item.code === 'BL1' ||
          item.code === 'SA' ||
          item.code === 'PD'
        );
      })
      .map(item => item.id);
    needed.push(arrayOfIds);
    this.setState({ gamesLoading: true });
    // TODO CHANGE TO ONLY GET ONE WEEK
    console.log(dateFrom === dateTo);
    axios
      .get(
        `https://api.football-data.org/v2/matches/?competitions=${needed}&dateFrom=${dateFrom.format(
          'YYYY-MM-DD'
        )}&dateTo=${(newDateTo ? newDateTo : dateTo).format('YYYY-MM-DD')}`,
        {
          headers
        }
      )
      .then(res => {
        this.setState({ matches: res.data, gamesLoading: false });
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getGamesFromSport = id => {
    console.log(id);
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    this.setState({ gamesLoading: true });
    axios
      .get(
        `https://api.football-data.org/v2/matches/?competitions=${id}&dateFrom=2019-04-12&dateTo=2019-04-22`,
        {
          headers
        }
      )
      .then(res => {
        this.setState({ matches: res.data, gamesLoading: false });
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onClick = e => {
    e.preventDefault();
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
      console.log(sport_key);
      prevState === sport_key
        ? this.setState({ showGames: !this.state.showGames })
        : this.setState({ showGames: true });
      this.getGamesFromSport(sport_key);
      this.setState({ active: sport_key });
    } else {
      e.target.parentElement.classList.add('active');
      const sport_key = e.target.parentElement.getAttribute('param');

      prevState === sport_key
        ? this.setState({ showGames: !this.state.showGames })
        : this.setState({ showGames: true });
      this.getGamesFromSport(sport_key);
      this.setState({ active: sport_key });
    }
    window.scrollTo(0, 0);
  };

  animateLeagueList = params => {};

  // TODO
  // ON LIST ITEM CLICK  => ANIMATE IT TO LEFT SIDE
  // => AND MAKE AN ARROW FROM IT TO THE NEXT LIST OF GAMES
  // => ON GAME CARD CLICK
  // => FOCUS ON IT ( ISOLATE MODE ) DROPDOWN ODDS

  render() {
    const { matches, gamesLoading, loading, leagues } = this.state;
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: '140px auto ',
      gridGap: '20px'
    };

    const leaguesList =
      leagues.competitions === undefined
        ? []
        : leagues.competitions.filter(item => {
            return (
              item.code === 'PL' ||
              item.code === 'FL1' ||
              item.code === 'BL1' ||
              item.code === 'SA' ||
              item.code === 'PD'
            );
          });

    if (loading) {
      let content = (
        <Container>
          <Spinner animation="grow" /> <Spinner animation="grow" />
          <Spinner animation="grow" />
        </Container>
      );
      return content;
    } else {
      let content = (
        <Container>
          <Spring
            from={{ opacity: 0, marginLeft: -500 }}
            to={{ opacity: 1, marginLeft: 0 }}
          >
            {props => (
              <div style={props}>
                <div className="list-grid" style={gridStyle}>
                  <LeagueList leagues={leaguesList} onclick={this.onClick} />
                  {gamesLoading ? (
                    <div>
                      <Spinner animation="grow" /> <Spinner animation="grow" />{' '}
                      <Spinner animation="grow" />
                    </div>
                  ) : (
                    <MatchesList
                      leagues={leaguesList}
                      matches={matches}
                      updateDate={this.updateDate}
                    />
                  )}
                </div>
              </div>
            )}
          </Spring>
        </Container>
      );
      return content;
    }
  }
}

export default Leagues;
