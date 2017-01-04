import React, { Component } from 'react';
import './Foundation.css';

import Card from './Card';

class Foundation extends Component {

  renderCards() {
    return this.props.cards.map(
      (card, idx, cards) => {
          let onClick;

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
      <div className={`slot foundation ${this.props.suit}`} onClick={ this.props.onClick }>
        { this.renderCards() }
      </div>
    )
  }
}

export default Foundation;
