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
  FILTER_LEAGUES
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
      console.log(res.data);
      dispatch({
        type: SET_LEAGUES,
        payload: res.data
      });

      const arrayOfIds = res.data.competitions.map(item => item.id);
      ids.push(arrayOfIds);

      dispatch(setMatchesLoading());
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/matches/?competitions=${ids}&dateFrom=${moment().format(
            'YYYY-MM-DD'
          )}&dateTo=${moment()
            .add(3, 'days')
            .format('YYYY-MM-DD')}`,
          {
            headers
          }
        )
        .then(res => {
          console.log(res.data);
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
