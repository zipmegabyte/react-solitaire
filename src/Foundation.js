import React, { Component } from 'react';
import './Foundation.css';

class Foundation extends Component {

  renderCards() {

  }

  render() {
    return (
      <div className={`slot foundation ${this.props.suit}`}>
        { this.renderCards() }
      </div>
    )
  }
}

export default Foundation;
