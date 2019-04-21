import React, { Component } from 'react';
// Redux

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getData,
  getClubElo,
  updateDate,
  filterLeagues,
  timeLeagues
} from '../actions/dataActions';

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
    if (this.props.data.leagues.length === 0) {
      this.props.getData();
    }
  }

  updateDate = (dateFrom, dateTo) => {
    this.props.updateDate(dateFrom, dateTo);
  };

  getGamesFromSport = id => {
    // const headers = {
    //   'X-Auth-Token': keys.footballAPI
    // };
    // this.setState({ gamesLoading: true });
    // axios
    //   .get(
    //     `https://api.football-data.org/v2/matches/?competitions=${id}&dateFrom=${moment().format(
    //       'YYYY-MM-DD'
    //     )}&dateTo=${moment()
    //       .add(3, 'days')
    //       .format('YYYY-MM-DD')}`,
    //     {
    //       headers
    //     }
    //   )
    //   .then(res => {
    //     this.setState({ matches: res.data, gamesLoading: false });
    //     this.getClubElo(res.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });    console.log(id)
    this.props.filterLeagues(id);
  };

  getGamesFromMenu = (id, status) => {
    this.props.timeLeagues(id, status);
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
    if (e.target.tagName === 'LI') {
      e.target.classList.add('active');
      const sport_key = e.target.getAttribute('param');
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
  };

  render() {
    // let matches;
    const {
      leagueLoading,
      matchesLoading,
      eloLoading,
      leagues,
      matches
    } = this.props.data;
    // this.props.data.matches === []
    //   ? (matches = this.state.matches)
    //   : (matches = this.props.data.matches);
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'auto 150px',
      gridGap: '20px'
    };

    const leaguesList =
      leagues.competitions === undefined ? [] : leagues.competitions;

    if (leagueLoading) {
      let content = (
        <Container>
          <Spinner variant="warning" animation="grow" />{' '}
          <Spinner variant="warning" animation="grow" />
          <Spinner variant="warning" animation="grow" />
        </Container>
      );
      return content;
    } else {
      let content = (
        <Container>
          <Spring
            from={{ opacity: 0, marginLeft: -300 }}
            to={{ opacity: 1, marginLeft: 0 }}
          >
            {props => (
              <div style={props}>
                <div className="list-grid" style={gridStyle}>
                  {matchesLoading ? (
                    <div>
                      <Spinner variant="warning" animation="grow" />{' '}
                      <Spinner variant="warning" animation="grow" />{' '}
                      <Spinner variant="warning" animation="grow" />
                    </div>
                  ) : (
                    <MatchesList
                      leagues={leaguesList}
                      matches={matches}
                      updateDate={this.updateDate}
                      getClubElo={this.getClubElo}
                      getGamesFromSport={this.getGamesFromSport}
                      eloLoading={eloLoading}
                      onmenuclick={this.getGamesFromMenu}
                      style={{ gridArea: 'matches' }}
                    />
                  )}
                  <LeagueList
                    leagues={leaguesList}
                    onclick={this.onClick}
                    style={{ gridArea: 'leagues' }}
                  />
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

Leagues.propTypes = {
  getData: PropTypes.func.isRequired,
  getClubElo: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  filterLeagues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getData, getClubElo, updateDate, filterLeagues, timeLeagues }
)(Leagues);
