import axios from 'axios';
import moment from 'moment';
import keys from '../config/keys';
import {
  GET_ERRORS,
  GET_FAV,
  ADD_OR_DELETE_FAV,
  SET_FAV,
  SET_LEAGUES,
  SET_MATCHES,
  ELO_LOADING,
  MATCHES_LOADING,
  LEAGUES_LOADING,
  SET_ELO,
  FILTER_LEAGUES,
  SET_ODDS,
  SET_STANDINGS,
  STANDINGS_LOADING
} from './types';

// Get Leagues & Matches
export const getData = () => dispatch => {
  const ids = [];
  dispatch(setLeaguesLoading());
  const headers = {
    'X-Auth-Token': keys.footballAPI
  };
  axios
    .get(
      'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions',
      {
        headers
      }
    )
    .then(res => {
      dispatch({
        type: SET_LEAGUES,
        payload: res.data
      });

      const arrayOfIds = res.data.competitions.map(item => item.id);
      ids.push(arrayOfIds);

      dispatch(setMatchesLoading());
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/matches/?competitions=${ids}&dateFrom=${moment()
            .subtract(3, 'days')
            .format('YYYY-MM-DD')}&dateTo=${moment()
            .add(3, 'days')
            .format('YYYY-MM-DD')}`,
          {
            headers
          }
        )
        .then(res => {
          dispatch({
            type: SET_MATCHES,
            payload: res.data
          });
          dispatch(getClubElo(res.data));
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getClubElo = data => dispatch => {
  const todayDate = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  dispatch(eloLoading());
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
        return teamselo.push({ club: item.Club, elo: item.Elo });
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
          let flooredElo = Math.floor(elo.elo);

          if (home.includes(elo.club)) {
            return (match.homeTeam.elo = flooredElo);
          }
          if (away.includes(elo.club)) {
            return (match.awayTeam.elo = flooredElo);
          }
          if (
            home.includes(elo.club.split(' ')[0]) &&
            home.includes(elo.club.split(' ')[1])
          ) {
            return (match.homeTeam.elo = flooredElo);
          }
          if (
            away.includes(elo.club.split(' ')[0]) &&
            away.includes(elo.club.split(' ')[1])
          ) {
            return (match.awayTeam.elo = flooredElo);
          }
          return null;
        });
        return null;
      });

      if (
        matches.map(match => {
          if (match.awayTeam.elo === undefined) {
            return (match.awayTeam.elo = 1400);
          }
          if (match.homeTeam.elo === undefined) {
            return (match.homeTeam.elo = 1400);
          }
          return null;
        })
      )
        dispatch({
          type: SET_ELO,
          payload: matches
        });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const updateDate = (from, to) => dispatch => {
  // TODO FIX DATES LOL
  let dateFrom = moment(from);
  const dateTo = moment(to);
  let newDateTo = '';
  const difference = dateTo.diff(dateFrom, 'days');

  if (difference > 10) {
    newDateTo = dateFrom.add(9, 'days');
  }
  // const headers = {
  //   'X-Auth-Token': keys.footballAPI
  // };
  // const ids = [];
  // const arrayOfIds = this.state.leagues.competitions.map(item => item.id);
  // ids.push(arrayOfIds);
  const ids = [];
  dispatch(setLeaguesLoading());
  const headers = {
    'X-Auth-Token': keys.footballAPI
  };
  axios
    .get(
      'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions',
      {
        headers
      }
    )
    .then(res => {
      const arrayOfIds = res.data.competitions.map(item => item.id);
      ids.push(arrayOfIds);
      dispatch(setMatchesLoading());
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/matches/?competitions=${ids}&dateFrom=${dateFrom.format(
            'YYYY-MM-DD'
          )}&dateTo=${(newDateTo !== '' ? newDateTo : dateTo).format(
            'YYYY-MM-DD'
          )}`,
          {
            headers
          }
        )
        .then(res => {
          dispatch({
            type: SET_MATCHES,
            payload: res.data
          });
          dispatch(getClubElo(res.data));
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err
          });
        });
    });
};

export const filterLeagues = id => dispatch => {
  dispatch({
    type: FILTER_LEAGUES,
    payload: id
  });
};

export const timeLeagues = (id, status) => dispatch => {
  const headers = {
    'X-Auth-Token': keys.footballAPI
  };
  dispatch(setMatchesLoading());
  axios
    .get(
      `https://api.football-data.org/v2/matches/?competitions=${id}&status=${status}`,
      {
        headers
      }
    )
    .then(res => {
      dispatch({
        type: SET_MATCHES,
        payload: res.data
      });
      dispatch(getClubElo(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getOdds = () => dispatch => {
  // // An api key is emailed to you when you sign up to a plan
  // const titles = [
  //   'EPL',
  //   'Ligue 1 - France',
  //   'Bundesliga - Germany',
  //   'Serie A - Italy',
  //   'La Liga - Spain'
  // ];
  // let leagueKeys = [];
  // // Get a list of in season sports
  // axios
  //   .get('https://api.the-odds-api.com/v3/sports', {
  //     params: {
  //       api_key: keys.oddsKey
  //     }
  //   })
  //   .then(res => {
  //     res.data.data.map(item => {
  //       if (titles.includes(item.title)) {
  //         return leagueKeys.push(item.key);
  //       }
  //       return null;
  //     });
  //     console.log(res.data);
  //     return;
  //   })
  //   .catch(error => {
  //     console.log('Error status', error.response.status);
  //     console.log(error.response.data);
  //   });
  // // To get odds for a sepcific sport, use the sport key from the last request
  // //   or set sport to "upcoming" to see live and upcoming across all sports
  // let sport_key = 'upcoming';
  // axios
  //   .get('https://api.the-odds-api.com/v3/odds', {
  //     params: {
  //       api_key: keys.oddsKey,
  //       sport: sport_key,
  //       region: 'uk', // uk | us | au
  //       mkt: 'h2h' // h2h | spreads | totals
  //     }
  //   })
  //   .then(res => {
  //     // odds_json['data'] contains a list of live and
  //     //   upcoming events and odds for different bookmakers.
  //     // Events are ordered by start time (live events are first)
  //     // if()
  //     let leagueOdds = [];
  //     res.data.data.map(league => {
  //       if (leagueKeys.includes(league.sport_key)) {
  //         return leagueOdds.push(league);
  //       }
  //       return null;
  //     });
  //     dispatch({
  //       type: SET_ODDS,
  //       payload: leagueOdds
  //     });
  //     // Check your usage
  //     console.log();
  //     console.log('Remaining requests', res.headers['x-requests-remaining']);
  //     console.log('Used requests', res.headers['x-requests-used']);
  //   })
  //   .catch(error => {
  //     console.log('Error status', error.res.status);
  //     console.log(error.response.data);
  //   });
};

export const getStandings = () => dispatch => {
  // const leagueIDs = [2021, 2015, 2002, 2019, 2014];
  // const headers = {
  //   'X-Auth-Token': keys.footballAPI
  // };
  // dispatch({
  //   type: STANDINGS_LOADING
  // });
  // leagueIDs.forEach(id => {
  //   axios
  //     .get(
  //       `https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/competitions/${id}/standings`,
  //       {
  //         headers
  //       }
  //     )
  //     .then(res => {
  //       dispatch({
  //         type: SET_STANDINGS,
  //         payload: { table: res.data.standings[0].table, id }
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });
};

export const setLeaguesLoading = () => {
  return {
    type: LEAGUES_LOADING
  };
};

export const setFav = () => {
  return {
    type: SET_FAV
  };
};

export const getFav = () => {
  return {
    type: GET_FAV
  };
};

export const addFav = id => {
  return {
    type: ADD_OR_DELETE_FAV,
    payload: id
  };
};

export const setMatchesLoading = () => {
  return {
    type: MATCHES_LOADING
  };
};

export const eloLoading = () => {
  return {
    type: ELO_LOADING
  };
};
