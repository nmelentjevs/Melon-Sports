This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Melon Sports

Football statistics for matches and teams and machine learning prediction for upcomming games. Deployed on Heroku

Live on https://www.melonsports.herokuapp.com

## Code style

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Tech/framework used

<b>Built with</b>

- [React](https://reactjs.org/)
- [react-bootstrap](https://react-bootstrap.github.io/)
- [TensorFlowJS](https://www.tensorflow.org/js)
- [Recharts](http://recharts.org/en-US)

## Install

    $ git clone https://github.com/nmelentjevs/melonsports.git
    $ cd printfultest
    $ npm install

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

Provide step by step series of examples and explanations about how to get a development env running.

## Examples

We have several examples [on the website](https://reactjs.org/). Here is the first one to get you started:

```jsx
import React from 'react';

import Card from 'react-bootstrap/Card';

function Answer(props) {
  return (
    <Card onClick={() => props.submit()}>
      <Card.Body style={{ alignContent: 'cemter', cursor: 'pointer' }}>
        {props.answer}
      </Card.Body>
    </Card>
  );
}

export default Answer;
```

This example will render Answer Component into a container on the page.

## API Reference

Football Data API
Read Docs at https://www.football-data.org/documentation/quickstart

Football elo API
Link: http://clubelo.com/API

## License

MIT © [nmelentjevs]()
