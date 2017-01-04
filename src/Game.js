import React, { Component } from 'react';
import './Game.css';

import Board from './Board';
import { shuffle } from './Util';

const suits = ['♥', '♦', '♣', '♠'];

const isOpposed = (suit1, suit2) => {
  switch (suit1) {
    case '♥':
    case '♦':
      return suit2 === '♣' || suit2 === '♠';
    default:
      return suit2 === '♥' || suit2 === '♦';
  }
}

const tryFoundations = (card, pile, state) => {

    const cardIdx = pile.indexOf(card);

    return suits.some(suit => {
        if (card.suit !== suit) {
            return false;
        }

        if (card.order - 1 !== state.foundations[suit].length) {
            return false;
        }

        const newFoundation = state.foundations[suit].concat(pile.splice(cardIdx));

        if (pile.length) {
            pile.push(Object.assign({}, pile.pop(), {up: true}));
        }

        state.foundations[suit] = newFoundation;

        return true;

    });
}

const tryTableau = (card, pile, state) => {

    return state.tableau.some((tableau, idx) => {

        const cardIdx = pile.indexOf(card);
        const lastCard = tableau[tableau.length - 1];

        if (lastCard && !isOpposed(card.suit, lastCard.suit)) {
            return false;
        }

        if (!(card.order === 13 && !lastCard) && !(lastCard && lastCard.order - 1 === card.order)) {
            return false;
        }

        const newTableau = tableau.concat(pile.splice(cardIdx));
        if (pile.length) {
            pile.push(Object.assign({}, pile.pop(), {up: true}));
        }
        state.tableau[idx] = newTableau;

        return true;
    });

}

const play = (card, pile, state) => {

    state.waste = state.waste.slice();
    state.foundations = Object.assign({}, state.foundations);
    state.tableau = state.tableau.slice();

    return tryFoundations(card, pile, state) || tryTableau(card, pile, state);
}

/* returns a shuffled deck of cards */
const deal = () => {
    const cards = [];

    suits.forEach(suit => {
        let order = 14;

        while (--order) {
            cards.push({suit, order});
        }
    });

    return shuffle(cards);
}

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
export { suits, play, deal, tryTableau };
