import React, { Component } from 'react';
import './Game.css';

import Board from './Board';

export const suits = ['♥', '♦', '♣', '♠'];

export const isOpposed = (suit1, suit2) => {
  switch (suit1) {
    case '♥':
    case '♦':
      return suit2 === '♣' || suit2 === '♠';
    default:
      return suit2 === '♥' || suit2 === '♦';
  }
}

class Game extends Component {

  render() {
    return (
      <div className="game">
        <Board />
        <div className="game-info">
        </div>
      </div>
    );
  }
}

export default Game;
