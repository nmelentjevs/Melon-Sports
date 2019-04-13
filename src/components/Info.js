import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

class Info extends Component {
  render() {
    const { home, away, id } = this.props;

    // const infoArray = JSON.stringify(info[0].sites.map(site => site.odds.h2h));

    return (
      <Card style={{ height: '150px' }}>
        <Card.Body>
          <div className="card-main">
            <Card.Title style={{ marginBottom: '10px' }}>
              {' '}
              Check Stats{' '}
            </Card.Title>
            <Link style={{ color: 'white' }} to={`/team/${id}/${home}`}>
              <Button variant="primary" style={{ marginRight: '10px' }}>
                Home Team{' '}
              </Button>
            </Link>
            <Link style={{ color: 'white' }} to="/compare/">
              <Button variant="primary" style={{ marginRight: '10px' }}>
                Compare
              </Button>
            </Link>{' '}
            <Link style={{ color: 'white' }} to={`/team/${id}/${away}`}>
              <Button variant="primary">Away Team </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Info;
