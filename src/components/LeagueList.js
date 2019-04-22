import React, { Component, Fragment } from 'react';

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFav, setFav } from '../actions/dataActions';

import ListGroup from 'react-bootstrap/ListGroup';

class LeagueList extends Component {
  render() {
    const { leagues, onclick, favourites } = this.props;
    return (
      <Fragment>
        <ListGroup lg="6">
          <ListGroup.Item
            style={{
              border: 'none',
              backgroundColor: '#f2a359',
              height: '40px',
              width: '100%'
            }}
          >
            <h5
              style={{
                fontSize: '.7rem',
                verticalAlign: 'middle'
              }}
            >
              Favourites
            </h5>
          </ListGroup.Item>
          {leagues !== undefined
            ? leagues
                .filter(item => {
                  return favourites.includes(item.code);
                })
                .map(league => {
                  return (
                    <ListGroup.Item
                      style={{
                        cursor: 'pointer',
                        height: '40px',
                        width: '100%',
                        border: '.5px solid rgba(0, 0, 0, 0.1)'
                      }}
                      className="league-item"
                      as="li"
                      key={league.id}
                      param={league.id}
                      onClick={onclick}
                    >
                      <h5
                        style={{
                          fontSize: '.7rem',
                          verticalAlign: 'middle'
                        }}
                      >
                        {league.name === 'UEFA Champions League'
                          ? 'Champions League'
                          : league.name}
                      </h5>
                    </ListGroup.Item>
                  );
                })
            : null}
        </ListGroup>
      </Fragment>
    );
  }
}

LeagueList.propTypes = {
  leagues: PropTypes.array.isRequired,
  setFav: PropTypes.func.isRequired,
  getFav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourites: state.data.favourites,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getFav, setFav }
)(LeagueList);
