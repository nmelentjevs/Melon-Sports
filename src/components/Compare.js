import React, { Component } from 'react';

import axios from 'axios';
import keys from '../config/keys';

class Compare extends Component {
  state = {
    team1Data: {},
    team2Data: {},
    loading: true
  };

  componentDidMount() {
    const { name1, name2, league } = this.props.match.params;
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    const leagueIDs = {
      premier_league: 2021,
      ligue1: 2015,
      bundesliga: 2002,
      serie_a: 2019,
      la_liga: 2014
    };

    let id;
    league === 'soccer_spain_la_liga'
      ? (id = leagueIDs.la_liga)
      : league === 'soccer_france_ligue_one'
      ? (id = leagueIDs.ligue1)
      : league === 'soccer_italy_serie_a'
      ? (id = leagueIDs.serie_a)
      : league === 'soccer_epl'
      ? (id = leagueIDs.premier_league)
      : league === 'soccer_germany_bundesliga'
      ? (id = leagueIDs.bundesliga)
      : (id = null);

    this.setState({ loading: true });
    axios
      .get(`http://api.football-data.org/v2/competitions/${id}/standings`, {
        headers
      })
      .then(res => {
        const teamData = res.data.standings[0].table.filter(position => {
          let splitName = name1.split(' ');
          splitName[0] === 'Real'
            ? (splitName = splitName[1])
            : (splitName = splitName[0]);
          return position.team.name.includes(splitName);
        });
        this.setState({ table: res.data.standings[0].table });
        this.setState({ teamData, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Compare</h1>
      </div>
    );
  }
}

export default Compare;
