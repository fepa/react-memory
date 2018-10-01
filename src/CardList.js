import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: [] };
    for(let i = 0; i < (this.props.count * 2); i++) {
      this.state.order.push(i);
    }
    this.shuffle(this.state.order);
  }

  matchesPreviousCard(card) {
    return this.props.activeCards[0].matches(card);
  }

  checkMatch(card) {
    // eslint-disable-next-line
    if(this.props.activeCards.length != 1) {
      this.props.setActive(card);
      return;
    }

    if(this.matchesPreviousCard(card)) {
      this.props.setMatch(card.props.pairing);
      this.props.clearActive();
    } else {
      this.props.setActive(card);
    }
  }

  card(key, pairing) {
    return <Card key={key} id={key} pairing={pairing} imageURL={this.props.imageURL(pairing)} checkMatch={this.checkMatch.bind(this)} matchedPairs={this.props.matchedPairs} activeCards={this.props.activeCards} />;
  }

  cards() {
    let cards = [];
    let key = 0;
    for(let i = 0; i < this.props.count; i++) {
      cards.push(this.card(key, i));
      key++;
      cards.push(this.card(key, i));
      key++;
    }

    cards.sort((a, b) => {
      const aPos = this.state.order.indexOf(a.props.id);
      const bPos = this.state.order.indexOf(b.props.id);
      if(aPos < bPos) {
        return -1;
      }
      if(aPos > bPos) {
        return 1;
      }
      return 0;
    });

    return cards;
  }

  shuffle(elements) {
    let temp, j, i = elements.length;
    while(--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = elements[i];
      elements[i] = elements[j];
      elements[j] = temp;
    }
    return elements;
  }

  finishedElement() {
    if(this.props.finished) {
      return <h1>You won!</h1>;
    } else {
      return null;
    }
  }

  classNames() {
    let classes  = ["cardList"];
    if(this.props.finished) {
      classes.push('-finished');
    }
    return classes.join(' ');
  }

  render() {
    return (
      <div className={this.classNames()}>
        {this.finishedElement()}
        {this.cards()}
      </div>
    );
  }
}

export default CardList;
