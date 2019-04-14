import React, { Component, Fragment } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class LeagueList extends Component {
  render() {
    const { leagues } = this.props;
    return (
      <Fragment>
        <ListGroup lg="6">
          <ListGroup.Item
            style={{
              border: 'none',
              backgroundColor: 'pink',
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
            ? leagues.map(league => {
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
                    onClick={this.props.onclick}
                  >
                    <h5
                      style={{
                        fontSize: '.7rem',
                        verticalAlign: 'middle'
                      }}
                    >
                      {league.name}
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

export default LeagueList;
