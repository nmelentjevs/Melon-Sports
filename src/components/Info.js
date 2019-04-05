import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

class Info extends Component {
  render() {
    const { info } = this.props;

    // const infoArray = JSON.stringify(info[0].sites.map(site => site.odds.h2h));

    return (
      <Card>
        <Card.Body>
          <div className="card-main">
            <Card.Title style={{ marginBottom: '10px' }}>
              {' '}
              Check Stats{' '}
            </Card.Title>
            <Link
              style={{ color: 'white' }}
              to={`/team/${info.sport_key}/${info.teams[0]}`}
            >
              <Button variant="primary" style={{ marginRight: '10px' }}>
                Home Team{' '}
              </Button>
            </Link>
            <Link style={{ color: 'white' }} to="/compare/">
              <Button variant="primary" style={{ marginRight: '10px' }}>
                Compare
              </Button>
            </Link>{' '}
            <Link
              style={{ color: 'white' }}
              to={`/team/${info.sport_key}/${info.teams[1]}`}
            >
              <Button variant="primary">Away Team </Button>
            </Link>
            <Card.Title style={{ margin: '10px 0' }}>Best Odds</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Bookmaker</th>
                  <th>Home</th>
                  <th>Draw</th>
                  <th>Away</th>
                </tr>
              </thead>
              <tbody>
                {info.sites.map(site => {
                  return (
                    <tr key={site.site_key}>
                      <td>{site.site_nice}</td>
                      <td>{site.odds.h2h[0]}</td>
                      <td>
                        {site.odds.h2h.length === 2
                          ? site.odds.h2h[2]
                          : site.odds.h2h[1]}
                      </td>
                      <td>
                        {site.odds.h2h.length === 2
                          ? site.odds.h2h[1]
                          : site.odds.h2h[2]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Info;
