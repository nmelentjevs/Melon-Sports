import React from 'react';

import Container from 'react-bootstrap/Container';

import TypedText from '../TypedText';

export default function Navbar() {
  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <h1 className="display-3" style={{ textAlign: 'left', flex: 1 }}>
          <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}
            >
              <img
                src={require('../../img/hami_melon_39773.png')}
                width="25px"
                alt="melon"
                style={{ paddingBottom: '10px' }}
              />{' '}
              <span style={{ fontWeight: '800' }}> Melon </span>
              <TypedText
                strings={[
                  '<strong style="color:orange">Sports<strong>',
                  '<strong style="color:orange">Predictions<strong>',
                  '<strong style="color:orange">Football ML<strong>'
                ]}
                style={{ display: 'inline-block ' }}
              />
            </span>
          </a>
        </h1>
      </div>
    </Container>
  );
}
