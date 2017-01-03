import React, { Component } from 'react';
import './Board.css';

import { suits, isOpposed } from './Game';
import { shuffle } from './Util';
import Tableau from './Tableau';
import Foundation from './Foundation';
import Stock from './Stock';
import Waste from './Waste';
import UndoButton from './UndoButton';

class Board extends Component {

  constructor() {
    super();

    let cards = this.deal();
    let count = 0;

    this.state = {
      cards: cards.slice(),
      historyLength: 0,
      waste: [],
      foundations: suits.reduce((result, item) => {
        result[item] = [];
        return result;
      }, {}),
      tableau: [],
      stock: cards,
      score: 0
    };

    this.history = [];

    while (count++ < 7) {
      const cardsInTableau = cards.splice(count * -1);

      cardsInTableau[cardsInTableau.length - 1].up = true;
      this.state.tableau.push(cardsInTableau);
    }

  }

  setStateAndAddToHistory(state) {
      this.history.push(Object.assign({}, this.state));
      state.historyLength = this.history.length;
      this.setState(state);
  }

  undo() {
      if (!this.history.length) {
          return;
      }

      this.setState(this.history.pop());
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

    this.setStateAndAddToHistory(state);
  }

  playFromWaste(card) {

    const waste = this.state.waste.slice();
    const state = this._play(card, waste);

    if (this.state.waste.length !== waste.length) {
      state.waste = waste;
    }

    this.setStateAndAddToHistory(state);
  }

  playFromTableau(card, idx) {

    const tableau = this.state.tableau[idx].slice();
    const state = this._play(card, tableau);

    if (this.state.tableau[idx].length !== tableau.length) {
      state.tableau[idx] = tableau;
    }

    this.setStateAndAddToHistory(state);
  }

  _tryFoundations(card, pile, state) {

      const cardIdx = pile.indexOf(card);

      suits.some(suit => {
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

    _tryTableau(card, pile, state) {

      const cardIdx = pile.indexOf(card);

      state.tableau.some((tableau, idx) => {

        const cardIdx = tableau.indexOf(card);
        const lastCard = tableau[tableau.length - 1];

        if (lastCard && !isOpposed(card.suit, lastCard.suit)) {
          return false;
        }

        if ((card.order === 13 && !lastCard) || (lastCard && lastCard.order - 1 !== card.order)) {
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

    _play(card, pile) {

      const state = Object.assign({}, this.state);

      state.waste = this.state.waste.slice();
      state.foundations = Object.assign({}, this.state.foundations);
      state.tableau = this.state.tableau.slice();

      let moved = this._tryFoundations(card, pile, state) || this._tryTableau(card, pile, state);

      return state;
  }

  renderFoundations() {
    return suits.map(suit => <Foundation key={suit} suit={suit} cards={this.state.foundations[suit]} disabled={!this.state.historyLength}/>);
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
        <div className="stock-container">
            <div>
                <Stock cards={this.state.stock} onClick={ () => this.playFromStock() } />
                <Waste cards={this.state.waste} onClick={ card => this.playFromWaste(card) } />
            </div>
            <div className="controls-container">
                <UndoButton onClick={ () => this.undo() } disabled={ !this.state.historyLength }/>
                <button className="btn btn-block btn-danger" onClick={ this.props.reset }>Reset</button>
            </div>
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
