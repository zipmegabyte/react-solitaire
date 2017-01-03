import React, { Component } from 'react';
import './Waste.css';

import Card from './Card';

class Waste extends Component {

  renderCards() {
    return this.props.cards.map(
      (card, idx, cards) => {
          let onClick = () => {};

          if (idx === cards.length - 1) {
            onClick = this.props.onClick;
          }

          return (
            <Card
              key={ idx }
              order={ card.order }
              suit={ card.suit }
              up={ card.up }
              onClick={ () => onClick(card) }
            />
          );
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
