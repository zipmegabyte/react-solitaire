import React, { Component } from 'react';
import Card from './Card';

class Tableau extends Component {

  getCards() {
    return {
      value: []
    }
  }

  renderCards() {

  }

  render() {
    return (
      <div className="slot">
        { this.renderCards() }
      </div>
    )
  }
}

export default Tableau;
