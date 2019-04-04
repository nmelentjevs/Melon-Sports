import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class LeagueList extends Component {
  render() {
    const { leagues } = this.props;
    return (
      <ListGroup lg="6">
        {leagues.map(league => {
          return (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              as="li"
              key={league.key}
              param={league.key}
              onClick={this.props.onclick}
            >
              <h5>
                {league.details} | {league.title}
              </h5>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default LeagueList;
