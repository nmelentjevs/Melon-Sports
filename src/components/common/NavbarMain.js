import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import TypedText from '../TypedText';

export default function NavbarMain() {
  return (
    <Fragment>
      <div style={{ display: 'flex', background: '#a63446' }}>
        <Container>
          <h1 className="display-3" style={{ textAlign: 'left', flex: 1 }}>
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
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
                    '<strong style="color:white">Sports<strong>',
                    '<strong style="color:white">Predictions<strong>',
                    '<strong style="color:white">Football ML<strong>'
                  ]}
                  style={{ display: 'inline-block ' }}
                />
              </span>
            </a>
          </h1>
        </Container>
      </div>
      <nav />
      <Navbar
        style={{
          background: '#89023e',
          letterSpacing: '3px',
          display: 'flex'
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/" style={{ color: 'white' }}>
                Home{' '}
              </Link>
              <Link
                className="nav-link"
                to="/news/Football"
                style={{ color: 'white' }}
              >
                News
              </Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}
