import React, { Component } from 'react';
import './App.css';

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
    return (
      <div className="card"></div>
    );
  }
}

class Board extends Component {

  render() {
    return (
      <div className="game-board"></div>
    );
  }
}

class Game extends Component {

  constructor() {
    super();

    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    this.cards = [];

    suits.forEach(suit => {
      let order = 14;

      while (--order) {
        this.cards.push(new Card(suit, order));
      }
    });

    this.state = {
      cards: shuffle(this.cards),
      score: 0
    }

  }

  render() {
    return (
      <div className="game">
        <Board/>
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
