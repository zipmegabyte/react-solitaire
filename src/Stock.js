import React, { Component } from 'react';
import './Stock.css';

import Card from './Card';

class Stock extends Component {

  renderCards(cards = this.props.cards.slice()) {
    const card = cards.shift();

    if (!card) {
      return;
    }

    return (
      <Card child={ this.renderCards(cards) } order={ card.order } suit={ card.suit }/>
    )
  }

  render() {
    return (
      <div className="stock">
        <div className="slot" onClick={ this.props.onClick }>{ this.renderCards() }</div>
      </div>
    )
  }
}

export default Stock;
