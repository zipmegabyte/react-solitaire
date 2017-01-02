import React, { Component } from 'react';
import './Game.css';

import Board from './Board';

export const suits = ['♥', '♦', '♣', '♠'];

class Game extends Component {

  constructor() {
    super();

    let cards = this.deal();
    let count = 0;

    this.state = {
      cards: cards.slice(),
      waste: [],
      foundations: {
        '♥': [],
        '♦': [],
        '♣': [],
        '♠': [],
      },
      tableau: [],
      stock: cards,
      score: 0
    }

    while (count++ < 7) {
      this.state.tableau.push(cards.splice(count));
    }

  }

  /* returns a shuffled deck of cards */
  deal() {
    const cards = [];

    suits.forEach(suit => {
      let order = 14;

      while (--order) {
        cards.push({suit, order});
      }
    });

    return shuffle(cards);
  }

  render() {
    return (
      <div className="game">
        <Board state={this.state} />
        <div className="game-info">
        </div>
      </div>
    );
  }
}

function shuffle(arr) {
  const shuffled = arr.slice();
  let currentPos = shuffled.length;

  while (currentPos) {
    const randomPos = Math.floor(Math.random() * currentPos--);
    const originalValue = shuffled[currentPos];

    shuffled[currentPos] = shuffled[randomPos];
    shuffled[randomPos] = originalValue;
  }

  return shuffled;
}

export default Game;
