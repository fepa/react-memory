import React from 'react';

class Card extends React.Component {
  isMatched() {
    return this.props.matchedPairs[this.props.pairing];
  }

  isActive() {
    return this.props.activeCards.indexOf(this) > -1;
  }

  isFaceUp() {
    return this.isMatched() || this.isActive();
  }

  matches(card) {
    return this.props.pairing === card.props.pairing;
  }

  clickHandler() {
    if(this.isMatched() || this.isActive()) {
      return;
    } else {
      this.props.checkMatch(this);
    }
  }

  render() {
    return (
      <div className={"card " + (this.isFaceUp() ? '' : '-face-down')} onClick={this.clickHandler.bind(this)}>
        <img src={this.props.imageURL} alt="Card" />
      </div>
    );
  }
};

export default Card;
