import React, { Component, Fragment } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class LeagueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: ['PL', 'FL1', 'BL1', 'SA', 'PD', 'CL']
    };
  }

  render() {
    const { leagues, onclick } = this.props;
    const { favourites } = this.state;
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

export default LeagueList;
