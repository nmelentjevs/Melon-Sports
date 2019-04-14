import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Info() {
  return (
    <Card style={{ height: '150px', width: '100%' }}>
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
