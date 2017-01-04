import React, {Component} from 'react';
import './Board.css';

import { play, suits, deal, tryTableau } from './Game';
import Tableau from './Tableau';
import Foundation from './Foundation';
import Stock from './Stock';
import Waste from './Waste';
import UndoButton from './UndoButton';

class Board extends Component {

    constructor() {
        super();

        let cards = deal();
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

    playFromStock() {

        // Nothing to play with
        if (!this.state.stock.length && !this.state.waste.length) {
          return;
        }

        const state = Object.assign({}, this.state, {
          stock: this.state.stock.slice(),
          waste: this.state.waste.slice()
        });

        if (state.stock.length) {
            state.waste.push(Object.assign({}, state.stock.pop(), {up: true}));
        } else {
            state.stock = state.waste.reverse().map(card => Object.assign({}, card, {up: false}));
            state.waste = [];
        }

        this.setStateAndAddToHistory(state);
    }

    playFromWaste(card) {

        const waste = this.state.waste.slice();
        const state = Object.assign({}, this.state);

        if (play(card, waste, state)) {
          state.waste = waste;
          this.setStateAndAddToHistory(state);
        }

    }

    playFromTableau(card, idx) {

      const tableau = this.state.tableau[idx].slice();
      const state = Object.assign({}, this.state);

      if (play(card, tableau, state)) {
        state.tableau[idx] = tableau;
        this.setStateAndAddToHistory(state);
      }

    }

    playFromFoundations(suit) {

      // Nothing to play with
      if (!this.state.foundations[suit].length) {
        return;
      }

      const foundation = this.state.foundations[suit].slice();
      const state = Object.assign({}, this.state);
      const card = foundation[foundation.length - 1];

      if (tryTableau(card, foundation, state)) {
        state.foundations[suit] = foundation;
        this.setStateAndAddToHistory(state);
      }
    }

    renderFoundations() {
        return suits.map(suit => <Foundation key={suit} suit={suit} cards={this.state.foundations[suit]} disabled={!this.state.historyLength} onClick={() => this.playFromFoundations(suit)}/>);
    }

    renderTableau() {
        let count = -1;
        const tableau = [];
        while (++count < 7) {
            tableau.push(<Tableau key={count} idx={count} cards={this.state.tableau[count]} onClick={(card, tableauIdx) => this.playFromTableau(card, tableauIdx)}/>);
        }

        return tableau;
    }

    render() {
        return (
            <div className="game-board">
                <div className="stock-container">
                    <div>
                        <Stock cards={this.state.stock} onClick={() => this.playFromStock()}/>
                        <Waste cards={this.state.waste} onClick={card => this.playFromWaste(card)}/>
                    </div>
                    <div className="controls-container">
                        <UndoButton onClick={() => this.undo()} disabled={!this.state.historyLength}/>
                        <button className="btn btn-block btn-danger" onClick={this.props.reset}>Reset</button>
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
