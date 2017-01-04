import React, { Component } from 'react';
import './Waste.css';

import Card from './Card';

class Waste extends Component {

  renderCards(cards = this.props.cards.slice()) {
    return this.props.cards.map(
      (card, idx) => {
          let onClick;

          if (idx === this.props.cards.length - 1) {
            onClick = () => this.props.onClick(card);
          }

          return (
            <Card
              key={ idx }
              order={ card.order }
              suit={ card.suit }
              up={ card.up }
              onClick={ onClick }
            />
          )
      }
    );
  }

  render() {
    return (
      <div className="waste">
        <div className="slot">
          { this.renderCards() }
        </div>
      </div>
    )
  }
}

export default Waste;
