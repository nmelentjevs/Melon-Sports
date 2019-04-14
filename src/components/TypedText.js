import React, { Component, Fragment } from 'react';

import Typed from 'typed.js';

class TypedText extends Component {
  componentDidMount() {
    // If you want to pass more options as props, simply add
    // your desired props to this destructuring assignment.
    const { strings } = this.props;
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 50
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
    this.typed.start();
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy();
  }

  render() {
    return (
      <Fragment>
        <span
          style={{ whiteSpace: 'pre' }}
          ref={el => {
            this.el = el;
          }}
        />
      </Fragment>
    );
  }
}

export default TypedText;
