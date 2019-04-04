import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import GameItem from './GameItem';

class MatchesList extends Component {
  render() {
    const { sportRes } = this.props;
    return (
      <ListGroup lg="6">
        <div className="matches">
          {sportRes.map(sport => {
            return (
              <ListGroup.Item
                as="li"
                key={sport.teams}
                param={sport.key}
                // onClick={this.onSportClick}
              >
                <GameItem
                  style={{ display: 'inline-block' }}
                  teams={sport.teams}
                  info={sport}
                />
              </ListGroup.Item>
            );
          })}
        </div>
      </ListGroup>
    );
  }
}

export default MatchesList;
