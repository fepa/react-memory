import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.baseState();
  }

  baseState() {
    return { finished: false, count: 5, matchedPairs: {}, activeCards: [], imageURL: "https://placekitten.com/100/100?image=" };
  }

  setCountHandler(event) {
    let state = this.baseState();
    state.count = event.target.value;
    this.setState(state);
  }

  setActive(card) {
    // eslint-disable-next-line
    if(this.state.activeCards.length == 2) {
      this.setState({ activeCards: [card] });
    } else {
      this.setState((prevState) => {
        let state = { activeCards: prevState.activeCards };
        state.activeCards.push(card);
        return state;
      });
    }
  }

  setImageService(event) {
    this.setState({ imageURL: event.target.value });
  }

  clearActive() {
    this.setState({ activeCards: [] });
  }

  resetHandler(event) {
    this.setState(this.baseState());
  }

  imageURL(index) {
    return this.state.imageURL + index;
  }

  finishGame() {
    this.setState({ finished: true });
  }

  setMatch(pairing) {
    this.setState(prevState => {
      prevState.matchedPairs[pairing] = true;
      return prevState;
    }, () => {
      // eslint-disable-next-line
      if(Object.keys(this.state.matchedPairs).length == this.state.count) {
        this.finishGame();
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Memory</h1>
          <p>Click the cards and try to pair them</p>
        </header>
        <p>
          <input type="range" onChange={this.setCountHandler.bind(this)} value={this.state.count} step="1" max="10" min="1" /> {this.state.count * 2}
        </p>
        <p>
          <input type="button" onClick={this.resetHandler.bind(this)} value="Restart game" />
        </p>
        <p>
          <select onChange={this.setImageService.bind(this)}>
            <option value="https://placekitten.com/100/100?image=">placekitten.com</option>
            <option value="https://picsum.photos/100/100?image=">picsum.photos</option>
          </select>
        </p>

        <CardList count={this.state.count} imageURL={this.imageURL.bind(this)} finished={this.state.finished} matchedPairs={this.state.matchedPairs} setMatch={this.setMatch.bind(this)} activeCards={this.state.activeCards} setActive={this.setActive.bind(this)} clearActive={this.clearActive.bind(this)} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
