import React, { Component } from 'react';
import './Card.css';

const ranks = {
   1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K'
}

class Card extends Component {

  constructor(props) {
    super(props);

    this.up = !!this.props.up;
    this.order = this.props.order;
    this.suit = this.props.suit;
    this.rank = ranks[this.order] || this.order;
  }

  renderContent() {
    if (!this.up) {
      return;
    }

    return (
      <div className="content">
        <div className="top">
          <span>{ this.rank }</span>
          <span>{ this.suit }</span>
        </div>
        <div className="bottom">
          <span>{ this.rank }</span>
          <span>{ this.suit }</span>
        </div>
      </div>
    )
  }

  render() {
    const classNames = ['card', this.suit];
    if (this.up) {
      classNames.push('up');
    }

    return (
      <div className={ classNames.join(' ') } onClick={ this.props.onClick }>
        { this.renderContent() }
        { this.props.child }
      </div>
    )
  }
}

export default Card;
