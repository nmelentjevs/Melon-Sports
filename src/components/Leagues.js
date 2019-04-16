import React, { Component } from 'react';
import axios from 'axios';
import keys from '../config/keys';
import moment from 'moment';

// Redux

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData, getClubElo, updateDate } from '../actions/dataActions';

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
    this.props.getData();
  }

  updateDate = (dateFrom, dateTo) => {
    this.props.updateDate(dateFrom, dateTo);
  };

  getGamesFromSport = id => {
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    this.setState({ gamesLoading: true });
    axios
      .get(
        `https://api.football-data.org/v2/matches/?competitions=${id}&dateFrom=${moment().format(
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
  };

  getGamesFromMenu = (id, status) => {
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    this.setState({ gamesLoading: true });
    axios
      .get(
        `https://api.football-data.org/v2/matches/?competitions=${id}&status=${status}`,
        {
          headers
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({ matches: res.data, gamesLoading: false });
        this.getClubElo(res.data);
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

  // TODO
  // ON LIST ITEM CLICK  => ANIMATE IT TO LEFT SIDE
  // => AND MAKE AN ARROW FROM IT TO THE NEXT LIST OF GAMES
  // => ON GAME CARD CLICK
  // => FOCUS ON IT ( ISOLATE MODE ) DROPDOWN ODDS

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
      gridTemplateColumns: '175px auto ',
      gridGap: '20px'
    };

    const leaguesList =
      leagues.competitions === undefined ? [] : leagues.competitions;

    if (leagueLoading) {
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
                  {matchesLoading ? (
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
                      getGamesFromSport={this.getGamesFromSport}
                      eloLoading={eloLoading}
                      onmenuclick={this.getGamesFromMenu}
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

Leagues.propTypes = {
  getData: PropTypes.func.isRequired,
  getClubElo: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getData, getClubElo, updateDate }
)(Leagues);
