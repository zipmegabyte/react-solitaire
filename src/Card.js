import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

  constructor(suit, order) {
    super();

    const ranks = {
       1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K'
    }

    this.suit = suit;
    this.order = order;
    this.rank = ranks[order] || order;
    this.flippedUp = false;
  }

  render() {
    if (!this.flippedUp) return (<div className="card"></div>)

    return (
      <div className='card'>
      </div>
    )
  }
}

export default Card;
