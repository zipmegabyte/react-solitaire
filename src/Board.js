import React, { Component } from 'react';
import './Board.css';

import { suits } from './Game';
import Tableau from './Tableau';
import Foundation from './Foundation';

class Board extends Component {

  renderFoundations() {
    return suits.map(suit => <Foundation key={suit} suit={suit}/>);
  }

  renderTableau() {
    let count = -1;
    const tableau = [];
    while (++count < 7) {
      tableau.push(<Tableau key={count} cards={this.props.state.tableau[count]}/>);
    }

    return tableau;
  }

  render() {
    return (
      <div className="game-board">
        <div>
          <div className="stock">
            <div className="slot"></div>
          </div>
          <div className="waste">
            <div className="slot"></div>
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
