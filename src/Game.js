import React, { Component } from 'react';
import './Game.css';

import Board from './Board';

export const suits = ['♥', '♦', '♣', '♠'];

export const isOpposed = (suit1, suit2) => {
    'use strict';
  switch (suit1) {
    case '♥':
    case '♦':
      return suit2 === '♣' || suit2 === '♠';
    default:
      return suit2 === '♥' || suit2 === '♦';
  }
};

class Game extends Component {

    constructor() {
        super();

        this.state = this.buildState();
    }

    buildState() {
        return {
            board: () => <Board reset={ this.reset.bind(this) }/>
        }
    }

    reset() {
        this.setState(this.buildState());
    }

  render() {

      const ActiveBoard = this.state.board;
    return (
      <div className="game">
        <ActiveBoard/>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

export default Game;
