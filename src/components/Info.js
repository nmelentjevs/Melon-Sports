import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Info extends Component {
  render() {
    // const infoArray = JSON.stringify(info[0].sites.map(site => site.odds.h2h));

    return (
      <Card style={{ height: '150px' }}>
        <Card.Body>
          <div className="card-main">
            <Card.Title />
            <Link style={{ color: 'white' }} to="/compare/">
              <Button variant="primary">AI Predict</Button>
            </Link>{' '}
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Info;
