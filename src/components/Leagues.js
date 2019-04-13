import React, { Component } from 'react';
import axios from 'axios';
import keys from '../config/keys';
import moment from 'moment';

// import { Transition, animated } from 'react-spring/renderprops';
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
    teamselo: [],
    showGames: false,
    loading: false,
    gamesLoading: false,
    eloLoading: false
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
      .then(res => {
        this.setState({
          leagues: res.data,
          loading: false
        });

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
        needed.push(arrayOfIds);
        axios
          .get(
            `https://api.football-data.org/v2/matches/?competitions=${needed}&dateFrom=${moment().format(
              'YYYY-MM-DD'
            )}&dateTo=${moment()
              .add(3, 'days')
              .format('YYYY-MM-DD')}`,
            {
              headers
            }
          )
          .then(res => {
            this.setState({ matches: res.data, gamesLoading: false });
            this.getClubElo(res.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .then(() => {})
      .catch(error => {
        console.log('Error status', error.response);
        console.log(error.response);
      });
    this.setState({ gamesLoading: true });
    this.getClubElo();
  }

  updateDate = (dateFr, dateT) => {
    // TODO FIX DATES LOL
    let dateFrom = moment(dateFr);
    const dateTo = moment(dateT);
    let newDateTo = '';
    const difference = dateTo.diff(dateFrom, 'days');

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
    // this.setState({ gamesLoading: true });
    axios
      .get(
        `https://api.football-data.org/v2/matches/?competitions=${needed}&dateFrom=${dateFrom.format(
          'YYYY-MM-DD'
        )}&dateTo=${(newDateTo !== '' ? newDateTo : dateTo).format(
          'YYYY-MM-DD'
        )}`,
        {
          headers
        }
      )
      .then(res => {
        this.setState({ matches: res.data, gamesLoading: false });
        this.getClubElo(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getClubElo = data => {
    const todayDate = moment().format('YYYY-MM-DD');
    this.setState({ eloLoading: true });
    axios({
      method: 'get',
      baseURL: `https://cors-anywhere.herokuapp.com/http://api.clubelo.com/`,
      url: `/${todayDate}`
    })
      .then(res => {
        function parseCSV(input) {
          var rows = input.split(/\r?\n/);
          var keys = rows.shift().split(',');
          return rows.map(function(row) {
            return row.split(',').reduce(function(map, val, i) {
              map[keys[i]] = val;
              return map;
            }, {});
          });
        }
        const parsedData = parseCSV(res.data);
        const teamselo = [];
        parsedData.slice(0, 300).map(item => {
          teamselo.push({ club: item.Club, elo: item.Elo });
        });
        let { matches } = data;
        matches.map(match => {
          let home = match.homeTeam.name;
          let away = match.awayTeam.name;

          const removeSpecial = string => {
            string = string.replace(/á/g, 'a');
            string = string.replace(/é/g, 'e');
            string = string.replace(/í/g, 'i');
            string = string.replace(/ó/g, 'o');
            string = string.replace(/ú/g, 'u');
            return string;
          };

          home = removeSpecial(home);
          away = removeSpecial(away);

          teamselo.map(elo => {
            if (home.includes(elo.club)) {
              match.homeTeam.elo = Math.floor(elo.elo);
            }
            if (away.includes(elo.club)) {
              match.awayTeam.elo = Math.floor(elo.elo);
            }
            if (
              home.includes(elo.club.split(' ')[0]) &&
              home.includes(elo.club.split(' ')[1])
            ) {
              match.homeTeam.elo = Math.floor(elo.elo);
            }
            if (
              away.includes(elo.club.split(' ')[0]) &&
              away.includes(elo.club.split(' ')[1])
            ) {
              match.awayTeam.elo = Math.floor(elo.elo);
            }
          });
        });

        if (
          matches.map(match => {
            if (match.awayTeam.elo === undefined) {
              match.awayTeam.elo = 1400;
            }
            if (match.homeTeam.elo === undefined) {
              match.homeTeam.elo = 1400;
            }
          })
        )
          this.setState({ matches, eloLoading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addEloToClubNames = () => {};

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
    const { matches, gamesLoading, loading, leagues, eloLoading } = this.state;
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
                      getClubElo={this.getClubElo}
                      eloLoading={eloLoading}
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
