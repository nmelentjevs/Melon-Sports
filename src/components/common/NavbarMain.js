import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import TypedText from '../TypedText';

export default function NavbarMain() {
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
                  '<strong style="color:lightcoral">Predictions<strong>',
                  '<strong style="color:palevioletred">Football ML<strong>'
                ]}
                style={{ display: 'inline-block ' }}
              />
            </span>
          </a>
        </h1>
      </div>
      <nav />
      <Navbar
        style={{
          background: 'white',
          letterSpacing: '3px',
          display: 'flex'
        }}
        expand="lg"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home" style={{ color: 'black' }}>
              Home
            </Nav.Link>
            <Nav.Link href="#link" style={{ color: 'black' }}>
              Link
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
