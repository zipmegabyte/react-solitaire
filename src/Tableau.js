import React, { Component } from 'react';
import './Tableau.css';

import Card from './Card';

class Tableau extends Component {

  renderCards(cards = this.props.cards.slice()) {
    const card = cards.shift();

    if (!card) {
      return;
    }

    let onClick = () => {};

    if (card.up) {
      onClick = this.props.onClick;
    }

    return (
      <Card
        child={this.renderCards(cards)}
        order={ card.order }
        suit={ card.suit }
        up={ card.up }
        onClick={ () => onClick(card, this.props.idx) }
      />
    )
  }

  render() {
    return (
      <div className="tableau">
        <div className="slot">
          { this.renderCards() }
        </div>
      </div>
    )
  }
}

export default Tableau;
