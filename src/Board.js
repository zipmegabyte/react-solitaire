import React, { Component } from 'react';
import './Board.css';

import { suits, isOpposed } from './Game';
import { shuffle } from './Util';
import Tableau from './Tableau';
import Foundation from './Foundation';
import Stock from './Stock';
import Waste from './Waste';

class Board extends Component {

  constructor() {
    super();

    let cards = this.deal();
    let count = 0;

    this.state = {
      cards: cards.slice(),
      waste: [],
      foundations: suits.reduce((result, item) => {
        result[item] = [];
        return result;
      }, {}),
      tableau: [],
      stock: cards,
      score: 0
    }

    while (count++ < 7) {
      const cardsInTableau = cards.splice(count * -1);

      cardsInTableau[cardsInTableau.length - 1].up = true;
      this.state.tableau.push(cardsInTableau);
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

  playFromStock() {
    let stock = this.state.stock.slice();
    let waste = this.state.waste.slice();
    const state = Object.assign({}, this.state);

    if (stock.length) {
      waste.push(stock.pop());
      waste[waste.length - 1].up = true;
    }
    else {
      if (!waste) {
        return;
      }

      stock = waste.reverse();
      stock.forEach(card => card.up = false);
      waste = [];
    }

    state.waste = waste;
    state.stock = stock;

    this.setState(state);
  }

  playFromWaste(card) {

    const waste = this.state.waste.slice();
    const state = this._play(card, waste);

    if (this.state.waste.length !== waste.length) {
      state.waste = waste;
    }

    this.setState(state);
  }

  playFromTableau(card, idx) {

    const tableau = this.state.tableau[idx].slice();
    const state = this._play(card, tableau);

    if (this.state.tableau[idx].length !== tableau.length) {
      state.tableau[idx] = tableau;
    }

    this.setState(state);
  }

  _play(card, pile) {

    const state = Object.assign({}, this.state);
    let moved = false;

    suits.forEach(suit => {
      if (card.suit !== suit) {
        return;
      }

      const foundation = state.foundations[suit].slice();

      if (card.order - 1 !== foundation.length) {
        return;
      }

      moved = true;
      foundation.push(pile.pop());
      pile[pile.length - 1].up = true;
      state.foundations[suit] = foundation;

    });


    state.tableau.forEach((tableau, idx) => {
      if (moved) {
        return;
      }

      const lastCard = tableau[tableau.length - 1];

      if (!isOpposed(card.suit, lastCard.suit)) {
        return;
      }

      if ((card.order === 13 && !lastCard) || (lastCard.order - 1 !== card.order)) {
        return;
      }

      moved = true;
      const newTableau = tableau.slice();
      newTableau.push(pile.pop());
      pile[pile.length - 1].up = true;
      state.tableau[idx] = newTableau;
    });

    return state;

  }

  renderFoundations() {
    return suits.map(suit => <Foundation key={suit} suit={suit} cards={this.state.foundations[suit]}/>);
  }

  renderTableau() {
    let count = -1;
    const tableau = [];
    while (++count < 7) {
      tableau.push(
        <Tableau
          key={ count }
          idx={ count }
          cards={ this.state.tableau[count] }
          onClick={ (card, tableauIdx) => this.playFromTableau(card, tableauIdx) }
        />
      );
    }

    return tableau;
  }

  render() {
    return (
      <div className="game-board">
        <div>
          <Stock cards={this.state.stock} onClick={ () => this.playFromStock() } />
          <Waste cards={this.state.waste} onClick={ card => this.playFromWaste(card) } />
        </div>

        <div className="tableau-container">
          {this.renderTableau()}
        </div>

        <div className="foundations-container">
          {this.renderFoundations()}
        </div>

      </div>
    );
  }

}

  export default Board;
